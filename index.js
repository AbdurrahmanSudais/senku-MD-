const { default: makeWASocket, useMultiFileAuthState, makeInMemoryStore, fetchLatestBaileysVersion } = require("@whiskeysockets/baileys");
const pino = require("pino");
const { Boom } = require("@hapi/boom");
const fs = require("fs");
require("dotenv").config();

// Import handlers
const commandHandler = require("./handlers/command");
const autoReply = require("./handlers/autoReply");

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("session");

    const { version } = await fetchLatestBaileysVersion();
    const sock = makeWASocket({
        version,
        printQRInTerminal: true,
        auth: state,
        logger: pino({ level: "silent" }),
        browser: ["SenkuBot", "Chrome", "1.0"],
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("messages.upsert", async ({ messages, type }) => {
        if (!messages[0]?.message) return;

        const msg = messages[0];
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text || "";

        console.log("Received message:", text);

        await commandHandler(sock, msg, text);
        await autoReply(sock, msg, text);
    });
}

startBot();
