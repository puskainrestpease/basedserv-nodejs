const TelegramBot = require('node-telegram-bot-api');
const token = 'токен'
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Привет, октагон!');
});

console.log('ехала');