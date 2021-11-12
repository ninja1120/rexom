const { Client, Message, Guild, MessageEmbed } = require("discord.js");
const ms = require("ms");
const emojis = require('../../config/emojis.json');

module.exports = {
    name: "help",
    aliases: ["h"],
    description: "Give's You The Commands List",

    /**
     * 
     * @param {Client} client
     * @param {Message} message
     * @param {Guild} guild
     */
    run: async(client, message, args, prefix, lang) => {
        try {
            const embed = new MessageEmbed()
                .setTitle(`Help Commands`)
                .setColor(0x2f3136)
                .setAuthor(message.guild.name, message.guild.iconURL())
                .setDescription(`**[NINJA - MUSIC](https://discord.com/api/oauth2/authorize?client_id=895640680423104513&permissions=8&redirect_uri=https%3A%2F%2Fninjaamusicboti-1.ahmednaser3.repl.co%2Fcallback&scope=bot)**, Play your favorite playlist with ninja 🎶\n
            Version: \`2.8.2\`
            Prefix: ${prefix}\n
            `)
            require('fs').readdir(__dirname + '/', (err, files) => {
                if (err) return console.error(err);
                files.forEach(file => {
                    if (!file.endsWith(".js")) return;
                    let props = require(__dirname + '/' + file);
                    embed.addFields({ name: prefix + props.name, value: props.description || "o", inline: true })
                });
            });
            message.reply({ content: emojis.loading + " | processing command...", allowedMentions: false, ephemeral: true }).then(msg => {
                setTimeout(() => { msg.edit({ content: emojis.done + " | processing complete!.", embeds: [embed], allowedMentions: false, ephemeral: true }) }, ms('1s'))
            });
        } catch {
            console.log('rexom')
        }
    }
};