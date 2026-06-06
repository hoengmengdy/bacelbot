const TelegramBot = require("node-telegram-bot-api");

const TOKEN = "8847402921:AAEAgtPxLEAOtq2hTRFqcTH03A2DrRc-f6c";

const bot = new TelegramBot(TOKEN, {
    polling: true
});

// START
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

// HELP
bot.onText(/\/help/, (msg) => {

    bot.sendMessage(
        msg.chat.id,
        `📚 របៀបប្រើប្រាស់

1️⃣ វាយ /start
2️⃣ ជ្រើសរើសមុខវិជ្ជា
3️⃣ ទទួល PDF វិញ្ញាសារ

Commands:
▶️ /start
▶️ /help
▶️ /clear`
    );

});

// CLEAR
bot.onText(/\/clear/, (msg) => {

    bot.sendMessage(
        msg.chat.id,
        "🗑 Menu ត្រូវបានលុប", {
            reply_markup: {
                remove_keyboard: true
            }
        }
    );

});

// BUTTON CLICK
bot.on("callback_query", async(query) => {

    const chatId = query.message.chat.id;

    try {

        switch (query.data) {

            case "history":

                await bot.sendMessage(
                    chatId,
                    "📖 កំពុងផ្ញើឯកសារប្រវត្តិវិទ្យា..."
                );

                await bot.sendDocument(chatId, "./pdf/World_history.pdf");
                await bot.sendDocument(chatId, "./pdf/historyKhmer_People's_Republic_of_Cambodia.pdf");
                await bot.sendDocument(chatId, "./pdf/history(French).pdf");
                await bot.sendDocument(chatId, "./pdf/history(socialism).pdf");
                await bot.sendDocument(chatId, "./pdf/history(Republic_of_Cambodia).pdf");
                await bot.sendDocument(chatId, "./pdf/historyKhmer_Rouge.pdf");
                await bot.sendDocument(chatId, "./pdf/history_of_the_Kingdom_of_Cambodia_2nd.pdf");
                await bot.sendDocument(chatId, "./pdf/History,science,social_studies,and_science.pdf");

                break;

            case "math":

                await bot.sendMessage(
                    chatId,
                    "➗ កំពុងផ្ញើវិញ្ញាសារគណិតវិទ្យា..."
                );

                await bot.sendDocument(
                    chatId,
                    "./pdf/Math.pdf", {
                        caption: "➗ គណិតវិទ្យា"
                    }
                );

                await bot.sendDocument(
                    chatId,
                    "./pdf/200_វិញ្ញាសាគណិតវិទ្យា_អ៊ី_សំអាត.pdf", {
                        caption: "➗ 200 វិញ្ញាសាគណិតវិទ្យា"
                    }
                );

                break;

            case "geo":

                await bot.sendMessage(
                    chatId,
                    "🌍 មិនទាន់មានឯកសារភូមិវិទ្យា"
                );

                break;

            case "chem":

                await bot.sendMessage(
                    chatId,
                    "🧪 កំពុងផ្ញើវិញ្ញាសារគីមីវិទ្យា..."
                );

                await bot.sendDocument(chatId, "./pdf/Kimi.pdf");
                await bot.sendDocument(chatId, "./pdf/Kimi1.pdf");
                await bot.sendDocument(chatId, "./pdf/Kimi2.pdf");
                await bot.sendDocument(chatId, "./pdf/Kimi3.pdf");
                await bot.sendDocument(chatId, "./pdf/Kimi4.pdf");
                await bot.sendDocument(chatId, "./pdf/Kimi5.pdf");
                await bot.sendDocument(chatId, "./pdf/Kimi6.pdf");

                break;

            case "physics":

                await bot.sendMessage(
                    chatId,
                    "⚛️ កំពុងផ្ញើវិញ្ញាសាររូបវិទ្យា..."
                );

                await bot.sendDocument(
                    chatId,
                    "./pdf/Physics_Preparatory_science_subject.pdf", {
                        caption: "⚛️ រូបវិទ្យា"
                    }
                );

                await bot.sendDocument(
                    chatId,
                    "./pdf/Physics_12thgrade.pdf"
                );

                break;

            case "biology":

                await bot.sendMessage(
                    chatId,
                    "🧑‍🔬 កំពុងផ្ញើវិញ្ញាសារជីវវិទ្យា..."
                );

                await bot.sendDocument(
                    chatId,
                    "./pdf/Biology_formula.pdf"
                );

                await bot.sendDocument(
                    chatId,
                    "./pdf/Biology_Science Preparatory Course.pdf"
                );

                break;

            case "khmer":

                await bot.sendMessage(
                    chatId,
                    "📚 កំពុងផ្ញើវិញ្ញាសារអក្សរសាស្រ្តខ្មែរ..."
                );

                await bot.sendDocument(
                    chatId,
                    "./pdf/Khmer_Literature_Preparatory_Course_for_Science_and_Social_Studies.pdf", {
                        caption: "📚 អក្សរសាស្រ្តខ្មែរ"
                    }
                );

                break;
        }

        await bot.answerCallbackQuery(query.id);

    } catch (err) {

        console.error(err);

        bot.sendMessage(
            chatId,
            "❌ រកមិនឃើញឯកសារ PDF\n\n" + err.message
        );

    }

});

console.log("✅ Bot Running...");