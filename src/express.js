const express = require('express');
const bodyParser = require('body-parser');
const { bot } = require('./config');

const app = express();
app.use(bodyParser.json());

app.post('/bot', (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

module.exports = app;
