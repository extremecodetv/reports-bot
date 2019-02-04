const { bot } = require('./config');
const handle = require('./tags');
const handleChannel = require('./tags/channel');
const AsyncLock = require('async-lock');

const lock = new AsyncLock();
const handleAsync = (msg) => {
    lock.acquire('message', async () => await handle(msg)); //eslint-disable-line
};

const handleChannelAsync = (msg) => {    
    lock.acquire('channel_post', async () => await handleChannel(msg)); //eslint-disable-line
}

const longPollingMode = async () => {
    bot.on('message', handleAsync);
    bot.on('channel_post', handleChannelAsync);
};

(async () => {
    require('./jobs')
    await longPollingMode();
})();
