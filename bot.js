const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');

let auth, settings

try {
  auth = JSON.parse(fs.readFileSync(path.join(__dirname, 'config', 'auth.json')), 'utf8');
  settings = JSON.parse(fs.readFileSync(path.join(__dirname, 'config', 'settings.json')), 'utf8');
} catch (err) {
  if (err) throw err
}

const bot = new Discord.Client()

const pf = settings.prefix
const admins = settings.admins

bot.login(auth.token)

bot.on('ready', () => {
  console.log('Hello!')
  bot.user.setPresence({ game: { name: `v${settings.version} - Created by Jason Liu`, type: 0 } })
});

bot.on('message', (msg) => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith(pf)) return;

  let mChannel = msg.channel;
  let member = msg.member;
  let mId = msg.id;
  let mStart = "**:ledger: > **"

  let full = msg.content.split(' ');
  let cmd = full[0].slice(pf.length, full[0].length).toUpperCase();
  let args = full.slice(1, full.length);

  // Ping
  if (cmd === "PING") {
    bot.sendMessage(mStart + "Pong!")
  }

});
