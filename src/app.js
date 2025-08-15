import express from 'express';
import { Telegraf } from 'telegraf';

const app = express();

// Берём токен из переменной окружения
const token = process.env.BOT_TOKEN;

if (!token) {
  console.error('BOT_TOKEN is missing. Add it in Render → Environment → BOT_TOKEN');
  process.exit(1); // чтобы сборка упала сразу, а не на запросе к Telegram
}

// Инициализируем бота
const bot = new Telegraf(token);

bot.start((ctx) => ctx.reply('Привет! Магазин EleaMarket запущен 💖'));
bot.hears(/привет/i, (ctx) => ctx.reply('Привет-привет 👋'));

// Простой веб-эндпоинт для Render (healthcheck)
app.get('/', (_req, res) => res.send('EleaMarket Bot работает!'));

// Стартуем HTTP-сервер (порт даёт Render)
const port = process.env.PORT || 10000;
app.listen(port, () => console.log(`Server running on port ${port}`));

// Запускаем бота
bot.launch();

// Корректная остановка
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
