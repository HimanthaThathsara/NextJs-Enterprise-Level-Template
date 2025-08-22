// flag with meow. not the all flag for the template.
import meow from 'meow';
import * as p from '@clack/prompts';
import meowHelp from 'cli-meow-help';

const flags = {
    clear: {
        type: `boolean`,
        default: false,
        shortFlag: `c`,
        desc: `Clear the console`
    },
    debug: {
        type: `boolean`,
        default: false,
        shortFlag: `d`,
        desc: `Print debug info`
    },
    version: {
        type: `boolean`,
        shortFlag: `v`,
        desc: `Print CLI version`
    }
};

const commands = {
    help: { desc: `Print help info` }
};

const helpText = meowHelp({
    name: `next-init`,
    flags,
    commands
});

const options = {
    importMeta: import.meta,
    inferType: true,
    description: false,
    hardRejection: false,
    flags
};

export default meow(helpText, options);
