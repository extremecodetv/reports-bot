const logger = require('./../../util/logger');
const commands = require('require-all')({
    dirname: __dirname,
    filter: /(.+command)\.js$/,
    recursive: true
});

const log = logger(module);

/* eslint-disable */
module.exports = (async (msg) => {
    try {
        for (command of Object.values(commands)) {
            await command(msg);
        }
    } catch (e) {
        log.error(e);
    }
});
