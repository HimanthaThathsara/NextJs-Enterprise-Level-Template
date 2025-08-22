import chalk from 'chalk';
import canPnpm from 'can-pnpm';
import * as p from '@clack/prompts';
import copy from 'copy-template-dir';

import questions from './questions.js';
import pkg_command from './pkg_command.js';
import createdFilesEdit from './createdFiles_Edit.js';

import { execa } from 'execa';
import { fileURLToPath } from 'url';
import { basename, dirname, join } from 'path';

// Get the current file and directory names
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async () => {

    // await user input
    const vars = await questions();
    const outDir = vars.name;

    // Define input(template) and output(working path and create a file) directory paths
    const inDirPath = join(__dirname, `../template`);
    const outDirPath = join(process.cwd(), outDir);

    const spinner = p.spinner();

    // Check if pnpm is available or not
    const { canPnpm: isPnpmAvailable } = await canPnpm();
    const pm = isPnpmAvailable ? 'pnpm' : 'npm';


    copy(inDirPath, outDirPath, vars, async (err, createdFiles) => {
        // inbuilt error handling
        if (err) throw err;

        // Notify user when the file is created
        p.log.success(
            chalk.white(
                `Creating files in ${chalk.green(`./${outDir}`)} directory:`
            )
        );

        // create the package.json file devDependencies and dependencies in different file and assign it to the old variable
        const { pkg_command_dep, pkg_command_dev } = await pkg_command(vars);

        // Edit createdFiles object base on the user input in different file and assign it to the old variable
        createdFiles = await createdFilesEdit(createdFiles);

        createdFiles.forEach(filePath => {
            const fileName = basename(filePath);
            /* ### debugging createdFiles and check the created files names
                // p.log.step(`${chalk.green(`CREATED`)} ${fileName}`);
            */
        });

        await p.tasks([
            {
                title: `installing npm ...  ${chalk.white(`It may take moment`)}`,
                task: async () => {
                    process.chdir(outDirPath);

                    /* ### debugging pkg_command_dep and pkg_command_dev for one last time
                        // console.log(pkg_command_dep);
                        // console.log(pkg_command_dev);
                    */

                    // Install dependencies not to the package.json, node_modules
                    await execa(pm, [`install`, ...pkg_command_dep]);
                    await execa(pm, [`install`, ...pkg_command_dev, `-D`]);
                    await execa(pm, [`dedupe`]);

                    // p.log.success(`${createdFiles.length} files created in ${chalk.white(`./${outDir}`)} directory`);

                    return 'Installed all npm packages';
                },
            },
        ]);

        // Success message. 
        p.log.success(`${chalk.green(`Dependencies`)} Installed!`);
    });
};
