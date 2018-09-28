const { bot, chatId } = require('./config');

const sendReport = async (msg) => {
    const report = `Автор: ${msg.from.first_name} ${msg.from.last_name}

${msg.text}
    `;

    await bot.sendMessage(chatId, report);
};

const hastags = ['отчет', 'отчёт'];
const isReport = (text) => {
    if (!text) {
        return false;
    }

    text = text.toLowerCase(); //eslint-disable-line
    let is = false;
    hastags.forEach(h => {
        is = is || (text.indexOf(`#${h}`) >= 0);
    });

    return is;
};

exports.handle = async (msg) => {
    if (isReport(msg.text)) {
        await sendReport(msg);
    }
};
