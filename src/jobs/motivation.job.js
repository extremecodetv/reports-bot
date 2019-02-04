const axios = require('axios')
const jimp = require('jimp')
const censore = require('censore-formatter')
const schedule = require('node-schedule');
const { bot, chatId } = require('../config');

const shedule = async () => {
    const { data } = await axios.get('http://fucking-great-advice.ru/api/random')
    const text = censore.formattingText(data.text)
    await bot.sendMessage(chatId, text + '\r\n\r\n#совет_дня')
}

let job
if (!job) {
    job = schedule.scheduleJob({ hour: 7, minute: 00 }, () => shedule);
}