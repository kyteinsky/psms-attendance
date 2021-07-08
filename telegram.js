'use strict';

require("dotenv").config();
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(
	process.env.telegramBotApiToken,
	{ polling: true },
)

async function sendImages(chatId) {
	try {
		await bot.sendPhoto(chatId, './ss.png', { contentType: 'image' });
		await bot.sendPhoto(chatId, './ss2.png');
		await bot.sendPhoto(chatId, './ss2.png');
		console.log('images sent');
	} catch (err) {
		console.error(err);
	}
}

module.exports = {
	sendImages,
	bot,
};
