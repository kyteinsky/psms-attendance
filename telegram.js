'use strict';

require("dotenv").config();
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const bot = new TelegramBot(
	process.env.telegramBotApiToken,
	{ polling: true },
)

async function sendImages(chatId) {
	try {
		if (fs.existsSync('./ss.png')) await bot.sendPhoto(chatId, './ss.png');
		if (fs.existsSync('./ss2.png')) await bot.sendPhoto(chatId, './ss2.png');
		if (fs.existsSync('./ss3.png')) await bot.sendPhoto(chatId, './ss3.png');
		console.log('images sent');
	} catch (err) {
		console.error(err);
	}
}

module.exports = {
	sendImages,
	bot,
};
