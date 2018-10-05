const { managerUserId } = require('../config');
const { send } = require('./send');
const isTag = require('./../util/isTag');

const getMessageText = (msg) => {
    return `Респект от Бородача! (@${msg.from.username})

${msg.text}
    `;
};

const respectHashtags = ['респект', 'респект_бородача', 'respect'];
module.exports = async (msg) => {
    if (isTag(msg.text, respectHashtags)) {
        if (msg.from.id === Number(managerUserId)) {
            await send(msg, getMessageText(msg));
        }
    }
};
