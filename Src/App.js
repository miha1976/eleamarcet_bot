import express from "express";
import { Telegraf } from "telegraf";

const app = express();

// Подключаем бота
const bot = new Telegraf(process.env.BOT_TOKEN);

// Реакция на команду /start
bot.start((ctx) => {
  ctx.reply("✅ Привет! Бот EleaMarket запущен и готов к работе.");
});

// Запуск бота
bot.launch();

// Запуск веб-сервера для Render
app.get("/", (req, res) => {
  res.send("EleaMarket Bot работает!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
