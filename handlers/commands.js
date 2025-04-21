require("dotenv").config();

module.exports = async (sock, msg, text) => {
    const sender = msg.key.remoteJid;
    const lower = text.toLowerCase();

    if (!lower.startsWith(".")) return;

    const command = lower.split(" ")[0].substring(1);

    const replies = {
        menu: `*SenkuBot Menu:*\n\n.menu - Show menu\n.help - Help info\n.ping - Bot status\n.owner - Bot owner info`,
        help: `*Help Center*\n\nNeed assistance? Contact *${process.env.OWNER_NAME}*`,
        ping: "🏓 *Pong!* SenkuBot is alive!",
        owner: `👑 *Bot Owner:*\n${process.env.OWNER_NAME}`
    };

    if (replies[command]) {
        await sock.sendMessage(sender, { text: replies[command] }, { quoted: msg });
    }
};
