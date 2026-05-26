import * as p from '@clack/prompts';

export default async () => await p.group(
	{
		// project name
		name: () => p.text({
			message: 'What is your project named ?',
			placeholder: 'next-init',
			validate(value) {
				if (!value.match(/^[a-z0-9-_\.]+$/)) {
					return 'Package name can only contain lowercase letters, numbers, dots, hyphens and underscores';
				}
				if (value.length > 214) {
					return 'Package name cannot be longer than 214 characters';
				}
			},
		}),

		stack: () =>
			p.select({
				message: 'Would you like to use Fullstack Template ?',
				options: [
					{ value: 'Fullstack', label: 'Fullstack', hint: 'Frontend + Backend' },
					{ value: 'Frontend', label: 'Frontend', hint: 'Frontend only' },
				],
			}),

		Type: () =>
			p.select({
				message: 'Would you like to use TypeScript ?',
				options: [
					{ value: 'TypeScript', label: 'TypeScript', hint: 'Recommended for type safety' },
					{ value: 'JavaScript', label: 'JavaScript', hint: 'JavaScript is fine too' },
				],
			}),

		Style: () =>
			p.select({
				message: 'Would you like to use CSS Framework ?',
				options: [
					{ value: 'Styled-Components', label: 'Styled Components', hint: 'CSS-in-JS & SSR support' },
					{ value: 'Tailwind-CSS', label: 'Tailwind CSS', hint: 'Recommended & with official plugins' },
					{ value: 'CSS-Modules', label: 'CSS Modules', hint: 'Full customization' },
					{ value: 'Sass/SCSS', label: 'Sass/SCSS', hint: 'Native to Next.js' },
					{ value: 'Emotion', label: 'Emotion', hint: 'CSS-in-JS & TypeScript optimized' },
				]
			}),

		Route: () =>
			p.select({
				message: 'Would you like to use App Router ?',
				options: [
					{ value: 'AppRoute', label: 'Yes', hint: 'Using App Router' },
					{ value: 'PageRoute', label: 'No', hint: 'Using Pages Router' },
				],
			}),

		extraQuestion: async ({ results }) => {
			const stack = results.stack;

			if (stack === "Fullstack") {
				return await p.group({
					Backend: () =>
						p.select({
							message: 'Would you like to use Backend ?',
							options: [
								{ value: 'Next-API', label: 'Next.js API Routes', hint: 'Built-in serverless backend' },
								{ value: 'Express-js', label: 'Express.js', hint: 'Node.js framework for building APIs' },
								{ value: 'Fastify', label: 'Fastify', hint: 'High-performance Node.js framework' },
								{ value: 'Nest-js', label: 'Nest.js', hint: 'Progressive Node.js framework' },
							],
						}),

					Database: () =>
						p.select({
							message: 'Would you like to use Database ?',
							options: [
								{ value: 'PostgreSQL', label: 'PostgreSQL', hint: 'Relational database' },
								{ value: 'Supabase', label: 'Supabase', hint: 'Open-source PostgreSQL alternative' },
								{ value: 'MongoDB', label: 'MongoDB', hint: 'NoSQL database' },
								{ value: 'SQLite', label: 'SQLite', hint: 'Lightweight database' },
								{ value: 'MySQL', label: 'MySQL', hint: 'Popular relational database' },
							],
						}),

					DataAccess: () =>
						p.select({
							message: 'Would you like to use Data Access Layer ?',
							options: [
								{ value: 'Sequelize', label: 'Sequelize', hint: 'Promise-based Node.js ORM' },
								{ value: 'Mongoose', label: 'Mongoose', hint: 'MongoDB ODM for Node.js' },
								{ value: 'TypeORM', label: 'TypeORM', hint: 'ORM for TypeScript and JavaScript' },
								{ value: 'Prisma', label: 'Prisma', hint: 'Next-gen ORM for Node.js' },
								{ value: 'None', label: 'None', hint: 'No Data Access Layer' }
							],
						}),

					Authentication: () =>
						p.select({
							message: 'Would you like to use Authentication ?',
							options: [
								{ value: 'NextAuth', label: 'NextAuth.js', hint: 'Next.js authentication library' },
								{ value: 'Firebase', label: 'Firebase', hint: 'Google’s mobile platform with authentication' },
								{ value: 'Supabase', label: 'Supabase', hint: 'Open-source Firebase alternative' },
								{ value: 'Passport', label: 'Passport.js', hint: 'Middleware for Node.js authentication' },
								{ value: 'Auth0', label: 'Auth0', hint: 'Authentication and authorization platform' },
								{ value: 'Clerk', label: 'Clerk', hint: 'User management and authentication' },
								{ value: 'None', label: 'None', hint: 'No Authentication' }
							],
						}),

					StateManagement: () =>
						p.select({
							message: 'Would you like to use State Management ?',
							options: [
								{ value: 'Zustand', label: 'Zustand', hint: 'Small, fast state-management solution' },
								{ value: 'Recoil', label: 'Recoil', hint: 'State management library for React' },
								{ value: 'Redux', label: 'Redux', hint: 'Predictable state container for TypeScript apps' },
								{ value: 'MobX', label: 'MobX', hint: 'Simple, scalable state management' },
								{ value: 'None', label: 'None', hint: 'No State Management' }
							],
						}),

					CI_CD: () =>
						p.select({
							message: 'Would you like to use CI/CD ?',
							options: [
								{ value: 'GitHub Actions', label: 'GitHub Actions', hint: 'CI/CD for GitHub repositories' },
								{ value: 'GitLab CI', label: 'GitLab CI', hint: 'CI/CD for GitLab repositories' },
								{ value: 'CircleCI', label: 'CircleCI', hint: 'CI/CD for GitHub and Bitbucket' },
								{ value: 'Jenkins', label: 'Jenkins', hint: 'Open-source automation server' },
								{ value: 'None', label: 'None', hint: 'No CI/CD' }
							],
						}),

				});
			}

			return undefined;
		},

		Testing: () =>
			p.multiselect({
				message: 'Would you like to use Testing ?',
				options: [
					{ value: 'Testing Library', label: 'Testing Library', hint: 'Lightweight testing utilities' },
					{ value: 'Playwright', label: 'Playwright', hint: 'End-to-end testing library' },
					{ value: 'Supertest', label: 'Supertest', hint: 'HTTP assertions for Node.js' },
					{ value: 'Cypress', label: 'Cypress', hint: 'End-to-end testing framework' },
					{ value: 'Vitest', label: 'Vitest', hint: 'Next-gen testing framework' },
					{ value: 'Mocha', label: 'Mocha', hint: 'JavaScript test framework for Node.js' },
					{ value: 'Jest', label: 'Jest', hint: 'JavaScript testing framework' },
					{ value: 'None', label: 'None', hint: 'No Testing' }
				],
			}),
	},
	{
		// On Cancel callback that wraps the group
		// So if the user cancels one of the prompts in the group this function will be called
		onCancel: ({ results }) => {
			p.cancel('Operation cancelled.');
			process.exit(0);
		},
	}
);

