const { bot, chatId, managerUserId } = require('../config');
const isTag = require('./../util/isTag');

const sendRespect = async (msg) => {
    const report = `Респект от Бородача!

${msg.text}
    `;

    await bot.sendMessage(chatId, report);
};

const respectHashtags = ['респект', 'респект_бородача', 'respect'];
module.exports = async (msg) => {
    if (isTag(msg.text, respectHashtags)) {
        if (msg.from.id === Number(managerUserId)) {
            await sendRespect(msg);
        }
    }
};
