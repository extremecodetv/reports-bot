const { send } = require('./send');
const isTag = require('./../util/isTag');


const getMessageText = (msg) => {
    return `Автор: ${msg.from.first_name} ${msg.from.last_name} (@${msg.from.username})

${msg.text}
    `;
};

const reportHastags = ['отчет', 'отчёт', 'report'];
module.exports = async (msg) => {
    if (isTag(msg.text, reportHastags)) {
        await send(msg, getMessageText(msg));
    }
};
