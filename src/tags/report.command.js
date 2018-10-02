const { bot, chatId } = require('../config');
const isTag = require('./../util/isTag');

const sendReport = async (msg) => {
    const report = `Автор: ${msg.from.first_name} ${msg.from.last_name}

${msg.text}
    `;

    await bot.sendMessage(chatId, report);
};

const reportHastags = ['отчет', 'отчёт'];
module.exports = async (msg) => {
    if (isTag(msg.text, reportHastags)) {
        await sendReport(msg);
    }
};
