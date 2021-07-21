'use strict';

require('dotenv').config();
const fn = require('./auto.js');
const { bot, sendImages } = require('./telegram');

(async () => { try {
	const [im, res] = await fn();
	console.log(res);
	bot.sendMessage(process.env.chatId, res);
	sendImages(process.env.chatId);
} catch (e) {
	console.log(err);
}})();
