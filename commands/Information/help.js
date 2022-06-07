const { MessageEmbed } = require("discord.js");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "help",
    aliases: ["h"],
    description: "Show all of the Commands",
    run: async (client, message, args, prefix) => {
        return message.reply({
            embeds: [new MessageEmbed()
                .setColor(ee.color)
                .setTitle(`**_${ee.name}_ | Help** \n👍 *Here is a list of all of my Commands*`)
                .addFields(client.commands.map(d => {
                    return {
                        name: `\`${prefix}${d.name}\``,
                        value: `> *${d.description}*`,
                        inline: true
                    }
                }))
                .setFooter(ee.name + ` | Made With Love ❌, With Code ✅ | By Subham Shaw#1344`, client.user.displayAvatarURL())
            ]
        }).catch(() => null);
    },
};