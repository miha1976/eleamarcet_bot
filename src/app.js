import express from 'express';
import { Telegraf } from 'telegraf';

const app = express();

// ЧТО ВАЖНО: токен берем из переменной окружения Render
const bot = new Telegraf(process.env.BOT_TOKEN);

// Хэндлер /start
bot.start((ctx) => ctx.reply('Привет! Магазин EleaMarket запущен 🚀'));
bot.launch();

// Простой хелсчек по корню
app.get('/', (_req, res) => {
  res.send('EleaMarket Bot работает!');
});

// Render передает порт в process.env.PORT
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));

// Корректная остановка бота
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
