#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const inquirer = require('inquirer');

async function main() {
  console.log('Welcome to the Enterprise Next.js Template Generator!');

  const questions = [
    {
      type: 'list',
      name: 'styling',
      message: 'Which styling solution do you want to use?',
      choices: ['Tailwind CSS', 'CSS Modules', 'Sass/SCSS', 'Styled-Components', 'Emotion', 'Chakra UI', 'MUI'], // Have 'Chakra UI', 'MUI'
    },
    {
      type: 'list',
      name: 'database',
      message: 'Which database do you want to configure?',
      choices: ['PostgreSQL', 'MongoDB', 'MySQL', 'PlanetScale', 'Supabase'],
    },
    {
      type: 'list',
      name: 'orm',
      message: 'Do you want to use an ORM for database integration?',
      choices: ['Prisma', 'TypeORM', 'None'],
    }, // Have ORM
    {
      type: 'list',
      name: 'apiTesting',
      message: 'Which API testing tool do you want to use?',
      choices: ['Jest + Supertest', 'Postman', 'Cypress', 'Playwright'],
    },
    {
      type: 'list',
      name: 'authentication',
      message: 'Which authentication solution do you want to use?',
      choices: ['NextAuth.js', 'Clerk', 'Auth0', 'Firebase Authentication', 'Okta'], // Have 'Okata'
    },
    {
      type: 'input',
      name: 'projectName',
      message: 'Enter your project name:',
      default: 'my-next-app',
    },
  ];

  const answers = await inquirer.prompt(questions);
  const projectDir = path.join(process.cwd(), answers.projectName);

  // Create Next.js project with TypeScript
  console.log('Creating Next.js project with TypeScript...');
  execSync(`npx create-next-app@latest ${answers.projectName} --typescript --eslint --app --src-dir --import-alias "@/*"`, { stdio: 'inherit' });

  // Navigate to project directory
  process.chdir(projectDir);

  // Install dependencies
  const dependencies = [];
  const devDependencies = ['typescript', '@types/node', '@types/react', '@types/react-dom'];

  // Styling dependencies
  switch (answers.styling) {
    case 'Tailwind CSS':
      devDependencies.push('tailwindcss', 'postcss', 'autoprefixer');
      break;
    case 'Sass/SCSS':
      dependencies.push('sass');
      break;
    case 'Styled-Components':
      dependencies.push('styled-components', '@types/styled-components');
      break;
    case 'Emotion':
      dependencies.push('@emotion/react', '@emotion/styled', '@emotion/server', '@types/emotion__react');
      break;
    case 'Chakra UI':
      dependencies.push('@chakra-ui/react', '@emotion/react', '@emotion/styled', 'framer-motion');
      break;
    case 'MUI':
      dependencies.push('@mui/material', '@emotion/react', '@emotion/styled');
      break;
  } // Have 'Chakra UI', 'MUI' push to the list


  switch (answers.database) {
    case 'PostgreSQL':
      dependencies.push('pg');
      break;
    case 'MongoDB':
      dependencies.push('mongodb', 'mongoose');
      break;
    case 'MySQL':
      dependencies.push('mysql2');
      break;
    case 'PlanetScale':
      dependencies.push('@planetscale/database');
      break;
    case 'Supabase':
      dependencies.push('@supabase/supabase-js');
      break;
  }

  if (answers.orm === 'Prisma') {
    devDependencies.push('prisma');
    dependencies.push('@prisma/client');
  } else if (answers.orm === 'TypeORM') {
    dependencies.push('typeorm');
  } // Have ORM dependencies

  // API testing dependencies
  switch (answers.apiTesting) {
    case 'Jest + Supertest':
      devDependencies.push('jest', '@types/jest', 'supertest', '@types/supertest', 'ts-jest');
      break;
    case 'Cypress':
      devDependencies.push('cypress');
      break;
    case 'Playwright':
      devDependencies.push('@playwright/test');
      break;
  }

  // Authentication dependencies
  switch (answers.authentication) {
    case 'NextAuth.js':
      dependencies.push('next-auth');
      break;
    case 'Clerk':
      dependencies.push('@clerk/nextjs');
      break;
    case 'Auth0':
      dependencies.push('@auth0/nextjs-auth0');
      break;
    case 'Firebase Authentication':
      dependencies.push('firebase');
      break;
    case 'Okta':
      dependencies.push('@okta/okta-auth-js', '@okta/okta-react');
      break;
  } // Have 'Okta'


  // Install dependencies
  console.log('Installing dependencies...');

  if (dependencies.length) {
    execSync(`npm install ${dependencies.join(' ')}`, { stdio: 'inherit' });
  }
  if (devDependencies.length) {
    execSync(`npm install --save-dev ${devDependencies.join(' ')}`, { stdio: 'inherit' });
  }

  // Create configuration files
  // Environment file
  fs.writeFileSync(
    '.env',
    `# Environment variables
NEXT_PUBLIC_API_URL=http://localhost:3000/api
${answers.database === 'PostgreSQL' ? 'DATABASE_URL=postgresql://user:password@localhost:5432/dbname?schema=public' : ''}
${answers.database === 'MongoDB' ? 'MONGODB_URI=mongodb://localhost:27017/dbname' : ''}
${answers.database === 'MySQL' ? 'DATABASE_URL=mysql://user:password@localhost:3306/dbname' : ''}
${answers.database === 'PlanetScale' ? 'DATABASE_URL=mysql://user:password@host/dbname' : ''}
${answers.database === 'Supabase' ? 'NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co\nSUPABASE_ANON_KEY=your-anon-key' : ''}
${answers.authentication === 'Auth0' ? 'AUTH0_CLIENT_ID=your-client-id\nAUTH0_CLIENT_SECRET=your-client-secret\nAUTH0_ISSUER=https://your-domain.auth0.com' : ''}
${answers.authentication === 'Firebase Authentication' ? 'NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key\nNEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain\nNEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id' : ''}
${answers.authentication === 'Clerk' ? 'CLERK_SECRET_KEY=your-secret-key\nNEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-publishable-key' : ''}
${answers.authentication === 'Okta' ? 'OKTA_CLIENT_ID=your-client-id\nOKTA_CLIENT_SECRET=your-client-secret\nOKTA_ISSUER=https://your-domain.okta.com' : ''}
`
  );

  // Tailwind CSS configuration
  if (answers.styling === 'Tailwind CSS') {
    fs.writeFileSync(
      'tailwind.config.js',
      `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
`
    );
    fs.writeFileSync(
      'postcss.config.js',
      `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`
    );
    fs.writeFileSync('src/app/globals.css', `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`);
  }

  // Chakra UI configuration
  if (answers.styling === 'Chakra UI') {
    fs.writeFileSync(
      'src/app/theme.ts',
      `import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

export default theme;
`
    );
    fs.writeFileSync(
      'src/app/provider.tsx',
      `'use client';

import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';

export default function Provider({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
`
    );
  }

  // Prisma configuration
  if (answers.orm === 'Prisma') {
    execSync('npx prisma init', { stdio: 'inherit' });
  }

  // Jest configuration
  if (answers.apiTesting === 'Jest + Supertest') {
    fs.writeFileSync(
      'jest.config.js',
      `module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
`
    );
    fs.writeFileSync(
      'jest.setup.js',
      `import '@testing-library/jest-dom';
`
    );
  }

  // Create a sample API route
  fs.mkdirSync('src/app/api/hello', { recursive: true });
  fs.writeFileSync(
    'src/app/api/hello/route.ts',
    `import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Hello from the API!' });
}
`
  );

  // Create Docker configuration
  fs.writeFileSync(
    'Dockerfile',
    `FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
`
  );
  fs.writeFileSync(
    '.dockerignore',
    `node_modules
npm-debug.log
.env
`
  );

  console.log(`Project ${answers.projectName} created successfully with the following configurations:`);
  console.log(`- Styling: ${answers.styling}`);
  console.log(`- Database: ${answers.database}`);
  console.log(`- ORM: ${answers.orm}`);
  console.log(`- API Testing: ${answers.apiTesting}`);
  console.log(`- Authentication: ${answers.authentication}`);
  console.log(`Run \`cd ${answers.projectName} && npm run dev\` to start the development server.`);
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});