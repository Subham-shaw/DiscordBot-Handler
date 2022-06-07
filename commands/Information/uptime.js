const { MessageEmbed } = require('discord.js');
const ee = require('../../botconfig/embed.json'); 
const emoji = require('../../botconfig/emoji.json');
module.exports = {
    name: "uptime",
    description: "Show the Bot's uptime",
    category: "Information",

    run: async (client, message, args, prefix) => {
        let date = new Date()
        let timestamp = date.getTime() - Math.floor(client.uptime);
        
        const uptimeEmbed = new MessageEmbed()
            .setColor(ee.color)
            .setTitle(`${ee.name} | Uptime`)
            .setDescription(`${emoji.online} **I'm running since <t:${Math.floor(timestamp / 1000)}:F> and was started <t:${Math.floor(timestamp / 1000)}:R>!**`)
            .setFooter(ee.name + ` | Made With Love ❌, With Code ✅ | By Subham Shaw#1344`, client.user.displayAvatarURL())
        message.channel.send( {embeds: [uptimeEmbed]})
    },
};