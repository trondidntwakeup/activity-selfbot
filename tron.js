const { Client } = require("discord.js-selfbot-v13");
const readline = require("readline");

const client = new Client();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const token = ""; // Buraya token'ını gir

client.on("ready", () => {
    console.log(`${client.user.username} olarak giriş yapıldı!`);
    setActivity("wins"); // oynamak istedigini ayarla kardesim
});

// Fake Oynuyor Durumu Değiştirme
function setActivity(activity) {
    client.user.setPresence({
        activities: [{ name: activity, type: "PLAYING" }],
        status: "online"
    });
    console.log(`Durum değiştirildi: ${activity}`);
}

// Mini Oyunlar Komutları
client.on("messageCreate", async (message) => {
    if (message.author.id !== client.user.id) return;

    const args = message.content.split(" ");
    const command = args[0].toLowerCase();

    if (command === "/zar") {
        const zar = Math.floor(Math.random() * 6) + 1;
        message.reply(`🎲 Zar attın: **${zar}**`);
    }
    else if (command === "/şans") {
        const sans = Math.floor(Math.random() * 100) + 1;
        message.reply(`🍀 Şansın: **%${sans}**`);
    }
    else if (command === "/rastgele") {
        if (!args[1] || isNaN(args[1])) return message.reply("Lütfen bir üst sınır gir! Örn: /rastgele 100");
        const max = parseInt(args[1]);
        const randomNum = Math.floor(Math.random() * max) + 1;
        message.reply(`🎲 Rastgele Sayı: **${randomNum}**`);
    }
    else if (command === "/durum") {
        const newStatus = args.slice(1).join(" ");
        if (!newStatus) return message.reply("Lütfen bir durum gir! Örn: /durum Netflix İzliyor");
        setActivity(newStatus);
        message.reply(`✅ Oynuyor durumu güncellendi: **${newStatus}**`);
    }
});

client.login(token);
