const { Bot, webhookCallback, InlineKeyboard, Keyboard } = require("grammy");
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const { FieldValue } = require('@google-cloud/firestore');

// database firebase
const User = require('./db');

// import modul local
const start = require('./start');
const status = require('./status');
const setname = require('./setname');





require("dotenv").config();

const bot = new Bot(process.env.TELEGRAM_TOKEN);

const app = express();

app.use(bodyParser.json());
app.use(cors());

// ========================== BOT ==========================
bot.command("start", async (ctx) => {
    start(ctx);
    await bot.api.sendMessage(ctx.chat.id, (await status(ctx)).chatStatus, {
        parse_mode: 'HTML',
        reply_markup: status(ctx).keyStatus
    });
});

bot.command("setname", async (ctx) => {
    setname(ctx);

});










































bot.on('message:text', async (ctx) => {
    await bot.api.sendMessage(ctx.chat.id, status().chatStatus, {
        parse_mode: 'HTML',
        reply_markup: status(ctx).keyStatus
    });
});


// menjalankan bot
if (process.env.NODE_ENV === "production") {
    app.use(express.json());
    app.use(webhookCallback(bot, "express"));

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Bot listening on port ${PORT}`);
    });
} else {
    bot.start();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Bot listening on port ${PORT} ❤❤🧡🧡`);
    });
}

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));