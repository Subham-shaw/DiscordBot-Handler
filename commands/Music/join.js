const emoji = require('../../botconfig/emoji.json');
const config = require('../../botconfig/config.json')
const embed = require('../../botconfig/embed.json')
const { getVoiceConnection } = require("@discordjs/voice");
const { Permissions } = require("discord.js");
module.exports = {
    name: "join",
    description: "Makes The Bot Join A Voice Channel",
    category: "Music",
    run: async (client, message, args, prefix) => {
        try {
            if (!message.member.voice.channelId) return message.reply({ content: `${emoji.no} **Please join a Voice-Channel first!**` }).catch(() => null);

            const oldConnection = getVoiceConnection(message.guild.id);
            if (oldConnection) return message.reply({ content: `${emoji.no} **I'm already connected in <#${oldConnection.joinConfig.channelId}>**!` }).catch(() => null);

            if (!message.member.voice.channel?.permissionsFor(message.guild?.me)?.has(Permissions.FLAGS.CONNECT)) {
                return message.reply({ content: `${emoji.no} **I'm missing the Permission to Connect to your Voice-Channel!**` }).catch(() => null);
            }
            if (!message.member.voice.channel?.permissionsFor(message.guild?.me)?.has(Permissions.FLAGS.SPEAK)) {
                return message.reply({ content: `${emoji.no} **I'm missing the Permission to speak in your Voice-Channel!**` }).catch(() => null);
            }

            await client.joinVoiceChannel(message.member.voice.channel);
            message.reply({ content: `${emoji.join} **I Have Joined Your VC!**` }).catch(() => null);
        } catch (e) {
            console.error(e);
            message.reply({ content: `${emoji.no} Could not join your VC because: \`\`\`${e.message || e}`.substring(0, 1950) + `\`\`\`` }).catch(() => null);
        }
    },
};