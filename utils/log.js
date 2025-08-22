
import * as p from '@clack/prompts';

// Log messages
export default info => {
    p.log.warn(info);
    p.log.error(info);
};
