'use strict';

require('dotenv').config();
const fn = require('./index.js');
const { bot , sendImages } = require('./telegram');

bot.on('message', async (msg) => {
	if (msg.text === 'dot') {
		console.log('yes dot');
		const res = await fn();
		bot.sendMessage(msg.chat.id, res);
		sendImages(msg.chat.id);
	}
});
