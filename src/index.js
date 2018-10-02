const { bot } = require('./config');
const handle = require('./tags');
const AsyncLock = require('async-lock');

const lock = new AsyncLock();
const handleAsync = (msg) => {
    lock.acquire('message', async () => await handle(msg)); //eslint-disable-line
};

const longPollingMode = async () => {
    bot.on('message', handleAsync);
};

(async () => {
    await longPollingMode();
})();
