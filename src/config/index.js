require('dotenv').config();

module.exports = {
    bot: require('./bot'),
    chatId: process.env.REPORTS_CHAT_ID,
    managerUserId: process.env.MANAGER_USER_ID
};
