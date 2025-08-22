#!/usr/bin/env node

import cli from './utils/cli.js';
import generate from './utils/generate.js';
import init from './utils/init.js';
import log from './utils/log.js';

/**
 * Extracts command-line interface (CLI) features for easy command-line tool creation
 * 
 * @type {Object} cli - The main CLI configuration object
 * @property {Object} flags - Contains all the command-line options/switches (like --help, -v, etc.)
 * @property {Array} input - The main arguments provided by the user when running the command
 * @property {Function} showHelp - A helper function that displays usage instructions to the user
 * 
 * @example
 * // If a user runs: myapp --version input.txt
 * // flags would contain: { version: true }
 * // input would contain: ['input.txt']
 */

const { flags, input, showHelp } = cli;
const { clear, debug } = flags;

(async () => {
    await init({ clear });
    input.includes(`help`) && showHelp(0);
    debug && log(flags);
    await generate();
})();


