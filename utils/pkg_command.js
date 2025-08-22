export default async function pkg_command(vars) {

    /* ### debugging params
        // console.log(vars);
    */

    // Get the type variable for a packages (Don't even touch this)
    const getTypeVar = (packages) => {
        return vars.Type === 'TypeScript' ? `@types/${packages}` : '';
    }

    let pkg_command_dev = [];
    let pkg_command_dep = [];

    // pass the TYPE check and add the necessary packages
    if (vars.Type === 'TypeScript') {
        pkg_command_dep.push(`next`, `react`, `react-dom`);
        pkg_command_dev.push(`typescript`, `@types/react@latest`, `@types/node@latest`, `@types/react-dom@latest`);
    }
    else {
        // Next.js, React, and ReactDOM are required dependencies Even its a JavaScript or a TypeScript
        pkg_command_dep.push(`next`, `react`, `react-dom`);
    }

    // pass the STYLE check and add the necessary packages
    switch (vars.Style) {
        case 'Styled-Components':
            pkg_command_dep.push(`styled-components`);
            pkg_command_dev.push(`${getTypeVar('styled-components')}`, `babel-plugin-styled-components`);
            break;
        case 'Tailwind-CSS':
            pkg_command_dev.push(`tailwindcss`, `postcss`, `autoprefixer`);
            break;
        case 'CSS-Modules':
            // CSS Modules are supported out of the box in Next.js
            // used Use ".module.css" extension end of the files
            break;
        case 'Sass/SCSS':
            pkg_command_dev.push(`sass`);
            break;
        case 'Emotion':
            pkg_command_dep.push(`@emotion/react`, `@emotion/styled`);
            pkg_command_dev.push(`@emotion/babel-plugin`);
            break;
        default:
            break;
    }

    // pass EXTRAQUESTION if it is not undefined
    if (vars.extraQuestion !== undefined) {

        // pass the BACKEND check and add the necessary packages
        switch (vars.extraQuestion.Backend) {
            case 'Next-API':
                // Next.js API routes are built-in, (use /api folder in Pages Router or /app/api in App Router).
                break;
            case 'Express-js':
                pkg_command_dep.push(`express`);
                pkg_command_dev.push(`${getTypeVar('express')}`);
                break;
            case 'Fastify':
                pkg_command_dep.push(`@fastify/cors`, `@fastify/helmet`);
                pkg_command_dev.push(`${getTypeVar('fastify')}`);
                break;
            case 'Nest-js':
                pkg_command_dep.push(`@nestjs/core`, `@nestjs/common`, `@nestjs/platform-express`, `reflect-metadata`);
                pkg_command_dev.push(`@nestjs/cli`, `@nestjs/schematics`);
                break;
            default:
                break;
        }

        // pass the DATABASE check and add the necessary packages
        switch (vars.extraQuestion.Database) {
            case 'MongoDB':
                pkg_command_dep.push(`mongodb`);
                pkg_command_dev.push(`${getTypeVar('mongodb')}`);
                break;
            case 'PostgreSQL':
                pkg_command_dep.push(`pg`);
                pkg_command_dev.push(`${getTypeVar('pg')}`);
                break;
            case 'MySQL':
                pkg_command_dep.push(`mysql2`);
                pkg_command_dev.push(`${getTypeVar('mysql2')}`);
                break;
            case 'SQLite':
                pkg_command_dep.push(`sqlite3`);
                pkg_command_dev.push(`${getTypeVar('sqlite3')}`);
                break;
            case 'Supabase':
                pkg_command_dep.push(`@supabase/supabase-js`);
                break;
            default:
                break;
        }

        // pass the DATAACCESS check and add the necessary packages
        switch (vars.extraQuestion.DataAccess) {
            case 'Sequelize':
                pkg_command_dep.push(`sequelize`);
                pkg_command_dev.push(`${getTypeVar('sequelize')}`);
                break;
            case 'Mongoose':
                pkg_command_dep.push(`mongoose`);
                pkg_command_dev.push(`${getTypeVar('mongoose')}`);
                break;
            case 'TypeORM':
                pkg_command_dep.push(`typeorm`, `reflect-metadata`);
                pkg_command_dev.push(`${getTypeVar('typeorm')}`);
                break;
            case 'Prisma':
                pkg_command_dep.push(`@prisma/client`);
                pkg_command_dev.push(`prisma`);
                break;
            case 'None':
                // No packages needed
                break;
            default:
                break;
        }

        // pass the AUTHENTICATION check and add the necessary packages
        switch (vars.extraQuestion.Authentication) {
            case 'NextAuth':
                pkg_command_dep.push('next-auth');
                break;
            case 'Firebase':
                pkg_command_dep.push('firebase', 'firebase-admin');
                break;
            case 'Supabase':
                pkg_command_dep.push('@supabase/supabase-js');
                break;
            case 'Passport':
                pkg_command_dep.push('passport', 'passport-local');
                pkg_command_dev.push(`${getTypeVar('passport')}`);
                break;
            case 'Auth0':
                pkg_command_dep.push('@auth0/nextjs-auth0');
                break;
            case 'Clerk':
                pkg_command_dep.push('@clerk/nextjs', '@clerk/clerk-react');
                break;
            case 'None':
                // No authentication packages needed
                break;
            default:
                break;
        }

        // pass the STATE check and add the necessary packages
        switch (vars.extraQuestion.StateManagement) {
            case 'Zustand':
                pkg_command_dep.push('zustand');
                break;
            case 'Recoil':
                pkg_command_dep.push('recoil');
                break;
            case 'Redux':
                pkg_command_dep.push('@reduxjs/toolkit', 'react-redux', `redux`);
                break;
            case 'MobX':
                pkg_command_dep.push('mobx', 'mobx-react-lite');
                break;
            case 'None':
                // No state management packages needed
                break;
            default:

                break;
        }

        // CI/CD has to do some modifications
        switch (vars.extraQuestion.CI_CD) {
            case 'GitHub-Actions':
                // GitHub Actions configuration will be handled via .github/workflows directory
                break;
            case 'GitLab-CI':
                // GitLab CI configuration will be handled via .gitlab-ci.yml file
                break;
            case 'CircleCI':
                // CircleCI configuration will be handled via .circleci/config.yml file
                break;
            case 'Jenkins':
                // Jenkins configuration will be handled via Jenkinsfile
                break;
            case 'None':
                // No CI/CD packages needed
                break;
            default:
                break;
        }

        // will add the testing part. TESTING is not a backend part it's a common part.
    }

    return {
        pkg_command_dep,
        pkg_command_dev
    };
}