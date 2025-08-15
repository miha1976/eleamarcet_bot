import express from "express";
import { Telegraf } from "telegraf";

const app = express();

// читай токен только из переменной окружения
const token = process.env.BOT_TOKEN;
if (!token) {
  console.error("Не найден BOT_TOKEN в переменных окружения");
  process.exit(1);
}

const bot = new Telegraf(token);

// простые хэндлеры
bot.start((ctx) => ctx.reply("Привет! Магазин EleaMarket запущен 🎉"));
bot.hears(/ping/i, (ctx) => ctx.reply("pong"));

// HTTP-сервер для Render
const PORT = process.env.PORT || 10000;

app.get("/", (_req, res) => res.send("EleaMarket Bot работает!"));
app.get("/healthz", (_req, res) => res.send("ok"));

// запускаем бота
bot.launch().then(() => console.log("Telegram bot запущен"));

// корректная остановка
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

app.listen(PORT, () => console.log(`HTTP-сервер слушает порт ${PORT}`));import express from 'express';
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
