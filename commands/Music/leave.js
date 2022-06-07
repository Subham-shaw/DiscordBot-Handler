const { getVoiceConnection } = require("@discordjs/voice");
module.exports = {
    name: "leave",
    aliases: ["disconnect", "dis", "stopleave"],
    description: "Leaves a Voice Channel and stops playing",
    category: "Music",
    run: async (client, message, args, prefix) => {
        try {
            if (!message.member.voice.channelId) return message.reply({ content: "<:M_x:950441844544794654> **Please join a Voice-Channel first!**" }).catch(() => null);

            const oldConnection = getVoiceConnection(message.guild.id);
            if (!oldConnection) return message.reply({ content: "<:M_x:950441844544794654> **I'm not connected somewhere!**" }).catch(() => null);
            if (oldConnection && oldConnection.joinConfig.channelId != message.member.voice.channelId) return message.reply({ content: "<:M_x:950441844544794654> **We are not in the same Voice-Channel**!" }).catch(() => null);

            await client.leaveVoiceChannel(message.member.voice.channel);

            message.reply({ content: "👍 Left your VC!" }).catch(() => null);
        } catch (e) {
            console.error(e);
            message.reply({ content: `❌ Could not join your VC because: \`\`\`${e.message || e}`.substring(0, 1950) + `\`\`\`` }).catch(() => null);
        }
    },
};