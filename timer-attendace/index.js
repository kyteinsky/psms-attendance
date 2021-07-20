'use strict';

require('dotenv').config();
const fn = require('../auto.js');
const { bot, sendImages } = require('../telegram');

module.exports = async function (context, myTimer) {
    var timeStamp = new Date().toISOString();
    
    if (myTimer.isPastDue)
        context.log('JavaScript is running late!');
    context.log('JavaScript timer trigger function ran!', timeStamp);
    const [ss, res] = await fn();
    context.log(res);
    bot.sendMessage(process.env.chatId, res);
    sendImages(process.env.chatId);
    const fs = require('fs');
    fs.unlink('../ss.png', function (err) {
        if (err) context.log(err);
        context.log('ss.png deleted!');
    });
    fs.unlink('../ss2.png', function (err) {
        if (err) context.log(err);
        context.log('ss2.png deleted!');
    });
    fs.unlink('../ss3.png', function (err) {
        if (err) context.log(err);
        context.log('ss3.png deleted!');
    });
    if (ss) {
        context.res = {
            body: ss,
            headers: {
                "content-type": "image/png"
            }
        };
    } else {
        context.res = {
            body: res,
        }
    }
};
