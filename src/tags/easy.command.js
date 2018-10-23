/**
 * Изи-день работа
 * Считаем количество дней прошедших без проблем
 */

const schedule = require('node-schedule');

const { bot, chatId } = require('../config');
const { send } = require('./send');
const isTag = require('./../util/isTag');

let counter = 0
let isEasyDay = false
let isAlredyEasyDay = false

const getRandomEmoji = (emoji) => {
    return emoji[Math.floor(Math.random() * emoji.length)];
};

const getEmoji = (counter) => {
    const bad = ['🌝','🌩','🔥','💔','🐔','⚓','️☠','️😧','😏','😆','🙀','🐭','🐓']
    const good = ['🎉']

    if (counter === 0) {
        return getRandomEmoji(bad)
    } else {
        return good[0]
    }
}

const shedule = () => {
    if (isEasyDay) {
        counter += 1
    } else {
        counter = 0
    }

    const emoji = getEmoji(counter)    
    bot.sendMessage(chatId, 'Дней без проблем на платформе  — ' + counter + ' ' + emoji)
}

let job
if (!job) {
    job = schedule.scheduleJob({ hour: 8, minute: 00 }, shedule);
}

const easyHastags = ['изи', 'easy', 'изи_день', 'легчайше'];
module.exports = async (msg) => {
    if (isTag(msg.text, easyHastags)) {
        isEasyDay = isEasyDay || true
    }
};
