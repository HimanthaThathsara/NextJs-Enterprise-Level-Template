
import chalk from 'chalk';
import * as p from '@clack/prompts';
import unhandled from 'cli-handle-unhandled';


export default async ({ clear = true }) => {
    // Handle unhandled promise rejections form "cli-handle-unhandled"
    unhandled();

    /* ### getting the content form package.json file and debugging
        // import { getPackageJson } from 'get-package-json-file';
        // const pkgJson = await getPackageJson(`./../package.json`);
    */

    // start prompt
    console.log('\n');
    p.intro(chalk.white.bold.bgCyan('Next.js Enterprise Template Generator'));

};



