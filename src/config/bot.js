const TelegramBot = require('node-telegram-bot-api');
const Agent = require('socks5-https-client/lib/Agent');
const log = require('./../util/logger')(module);

const requestOptions = { };

module.exports = (() => { /* eslint-disable-line */
    try {
        const isProxyRequired = process.env.PROXY_REQUIRED.indexOf('true') !== -1;
        if (isProxyRequired) {
            requestOptions.agentClass = Agent;
            requestOptions.agentOptions = { // *bang* This is America (Russia)
                socksHost: process.env.PROXY_SOCKS5_HOST,
                socksPort: Number(process.env.PROXY_SOCKS5_PORT),
                socksUsername: process.env.PROXY_SOCKS5_USERNAME,
                socksPassword: process.env.PROXY_SOCKS5_PASSWORD
            };
        }

        const bot = new TelegramBot(process.env.BOT_TOKEN, {
            polling: true,
            request: requestOptions
        });

        return bot;
    } catch (err) {
        log.error(err);
        process.exit();
    }
})();
