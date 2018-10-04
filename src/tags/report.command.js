const { bot, chatId } = require('../config');
const isTag = require('./../util/isTag');

const emoji = [
    ['🤔', '😉'],
    ['😡', '😍'],
    ['😈', '👿'],
    ['👍🏻', '👎🏻'],
    ['🐔', '🐷'],
    ['🌚', '🌝'],
    ['🔥', '❄️'],
    ['🚀', '⚓️'],
    ['❤️', '💔'],
    ['👽', '🤖']
];

const getRandomEmojiPair = () => {
    return emoji[Math.floor(Math.random() * emoji.length)];
};

const getMessageText = (msg) => {
    return `Автор: ${msg.from.first_name} ${msg.from.last_name} (@${msg.from.username})

${msg.text}
    `;
};

const sendReport = async (msg) => {
    const report = getMessageText(msg);
    const pair = getRandomEmojiPair();
    const post = await bot.sendMessage(
        chatId,
        report, {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: `${pair[0]} — 0`,
                            callback_data: JSON.stringify({
                                vote: '+',
                                plus: 0,
                                minus: 0,
                                emoji: pair
                            })
                        },
                        {
                            text: `${pair[1]} — 0`,
                            callback_data: JSON.stringify({
                                vote: '-',
                                plus: 0,
                                minus: 0,
                                emoji: pair
                            })
                        }
                    ]
                ]
            }
        }
    );

    const messageId = post.message_id;
};


bot.on('callback_query', async (callback) => {
    const data = JSON.parse(callback.data);

    if (data.vote === '+') {
        data.plus += 1;
    } else {
        data.minus += 1;
    }

    const get = (obj, sign) => {
        data.vote = sign;
        return data;
    };
    const plus = JSON.stringify(get(data, '+'));
    const mins = JSON.stringify(get(data, '-'));

    await bot.editMessageText(
        callback.message.text,
        {
            chat_id: chatId,
            message_id: callback.message.message_id,
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: `${data.emoji[0]} — ${data.plus}`,
                            callback_data: plus
                        },
                        {
                            text: `${data.emoji[1]} — ${data.minus}`,
                            callback_data: mins
                        }
                    ]
                ]
            }
        }
    );
});

const reportHastags = ['отчет', 'отчёт', 'report'];
module.exports = async (msg) => {
    if (isTag(msg.text, reportHastags)) {
        await sendReport(msg);
    }
};
