require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

const TOKEN = process.env.BOT_TOKEN;

const bot = new TelegramBot(TOKEN, {
    polling: true
});

// ================= START =================
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(
        msg.chat.id,
        `🎓 សូមស្វាគមន៍!

📚 Bot វិញ្ញាសារបាក់ឌុប
📖 ជ្រើសរើសមុខវិជ្ជាខាងក្រោម

ℹ️ /help សម្រាប់ជំនួយ`, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "📖 ប្រវត្តិវិទ្យា", callback_data: "history" }],
                    [{ text: "➗ គណិតវិទ្យា", callback_data: "math" }],
                    [{ text: "🌍 ភូមិវិទ្យា", callback_data: "geo" }],
                    [{ text: "🧪 គីមីវិទ្យា", callback_data: "chem" }],
                    [{ text: "⚛️ រូបវិទ្យា", callback_data: "physics" }],
                    [{ text: "🧑‍🔬 ជីវវិទ្យា", callback_data: "biology" }],
                    [{ text: "📚 អក្សរសាស្រ្តខ្មែរ", callback_data: "khmer" }]
                ]
            }
        }
    );
});

// ================= HELP =================
bot.onText(/\/help/, (msg) => {
    bot.sendMessage(msg.chat.id,
        `📚 របៀបប្រើប្រាស់

1️⃣ /start
2️⃣ ជ្រើសមុខវិជ្ជា
3️⃣ ទទួល PDF`);
});

// ================= CLEAR =================
bot.onText(/\/clear/, (msg) => {
    bot.sendMessage(msg.chat.id, "🗑 Menu cleared", {
        reply_markup: { remove_keyboard: true }
    });
});

// ================= CALLBACK BUTTONS =================
bot.on("callback_query", async(query) => {
    const chatId = query.message.chat.id;

    try {
        // ⚠️ IMPORTANT FIX: answer immediately
        await bot.answerCallbackQuery(query.id);

        switch (query.data) {

            case "history":
                await bot.sendMessage(chatId, "📖 Sending History PDFs...");
                await bot.sendDocument(chatId, "./pdf/World_history.pdf");
                await bot.sendDocument(chatId, "./pdf/historyKhmer.pdf");
                break;

            case "math":
                await bot.sendMessage(chatId, "➗ Sending Math PDFs...");
                await bot.sendDocument(chatId, "./pdf/Math.pdf");
                await bot.sendDocument(chatId, "./pdf/Math_200_questions.pdf");
                break;

            case "geo":
                await bot.sendMessage(chatId, "🌍 Geography coming soon...");
                break;

            case "chem":
                await bot.sendMessage(chatId, "🧪 Sending Chemistry PDFs...");
                await bot.sendDocument(chatId, "./pdf/Chemistry.pdf");
                break;

            case "physics":
                await bot.sendMessage(chatId, "⚛️ Sending Physics PDFs...");
                await bot.sendDocument(chatId, "./pdf/Physics.pdf");
                break;

            case "biology":
                await bot.sendMessage(chatId, "🧑‍🔬 Sending Biology PDFs...");
                await bot.sendDocument(chatId, "./pdf/Biology.pdf");
                break;

            case "khmer":
                await bot.sendMessage(chatId, "📚 Sending Khmer PDFs...");
                await bot.sendDocument(chatId, "./pdf/Khmer_Literature.pdf");
                break;
        }

    } catch (err) {
        console.error(err);
        bot.sendMessage(chatId, "❌ Error: " + err.message);
    }
});

console.log("✅ Bot is running...");