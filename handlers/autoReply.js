module.exports = async (sock, msg, text) => {
    const sender = msg.key.remoteJid;
    const lower = text.toLowerCase();

    const autoReplies = {
        "hi": "Hey! I'm SenkuBot. Type `.menu` to get started!",
        "hello": "Hello there! SenkuBot at your service.",
        "who are you": "I'm SenkuBot — your anime-themed WhatsApp bot.",
        "how are you": "I'm functioning perfectly, thanks for asking!"
    };

    if (autoReplies[lower]) {
        await sock.sendMessage(sender, { text: autoReplies[lower] }, { quoted: msg });
    }
};
