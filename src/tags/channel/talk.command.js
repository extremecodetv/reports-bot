
const { bot, chatId } = require('../../config');
//-4424902387448873395
//const deployBotId = await bot.getChatMember//@platform_deploy_bot
module.exports = async (msg) => {
    if (msg.text.indexOf('Задеплоилось') !== -1) {
        await bot.sendMessage(msg.chat.id, '☝🏽')
    }
};
