const { bot, chatId, managerUserId } = require('../config');

const sendRespect = async (msg) => {
    const report = `Респект от Бородача!

${msg.text}
    `;

    await bot.sendMessage(chatId, report);
};

const respectHashtags = ['респект', 'респект_бородача'];
const isRespect = (text) => {
    if (!text) {
        return false;
    }

    text = text.toLowerCase(); //eslint-disable-line
    let is = false;
    respectHashtags.forEach(h => {
        is = is || (text.indexOf(`#${h}`) >= 0);
    });

    return is;
};

module.exports = async (msg) => {
    if (isRespect(msg.text)) {
        if (msg.from.id === managerUserId) {
            await sendRespect(msg);
        }
    }
};
