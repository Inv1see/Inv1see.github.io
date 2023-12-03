const TelegramBot = require('node-telegram-bot-api');
const token = '6919644314:AAFvJt1ozyfoeLbqK6_-IALCx5dHkTyclMo';

// Создаем экземпляр бота
const bot = new TelegramBot(token, { polling: true });

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Привет! Давай сыграем в "камень, ножницы, бумага".');
    bot.sendMessage(chatId, '/rock - выбрать камень\n/scissors - выбрать ножницы\n/paper - выбрать бумагу');
});

// Обработчик текстовых сообщений
bot.onText(/(.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const userChoice = match[1].toLowerCase();

    // Помощь в игре
    if (userChoice === '/help') {
        bot.sendMessage(chatId, '/rock - выбрать камень\n/scissors - выбрать ножницы\n/paper - выбрать бумагу');
    }

    // Игровая логика
    if (userChoice === '/rock' || userChoice === '/scissors' || userChoice === '/paper') {
        const choices = ['/rock', '/scissors', '/paper'];
        const randomChoice = choices[Math.floor(Math.random() * choices.length)];

        if (userChoice === randomChoice) {
            bot.sendMessage(chatId, `Ты выбрал ${userChoice}, я выбрал ${randomChoice}. Ничья!`);
        } else if (
            (userChoice === '/rock' && randomChoice === '/scissors') ||
            (userChoice === '/scissors' && randomChoice === '/paper') ||
            (userChoice === '/paper' && randomChoice === '/rock')
        ) {
            bot.sendMessage(chatId, `Ты выбрал ${userChoice}, я выбрал ${randomChoice}. Ты выиграл!`);
        } else {
            bot.sendMessage(chatId, `Ты выбрал ${userChoice}, я выбрал ${randomChoice}. Ты проиграл!`);
        }
    }
});

// Запускаем бота
bot.on('polling_error', (error) => {
    console.log(error);  // выводим ошибки в консоль
});

console.log('Бот успешно запущен');