const { getVoiceConnection } = require("@discordjs/voice");
const { MessageEmbed } = require("discord.js");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "nowplaying",
    description: "Shows information about the current track",
    run: async (client, interaction, args, prefix) => {
        if(!interaction.member.voice.channelId) return interaction.reply({ ephemeral: true, content: "<:M_x:950441844544794654> **Please join a Voice-Channel first!**"}).catch(() => null);
        // get an old connection
        const oldConnection = getVoiceConnection(interaction.guild.id);
        if(!oldConnection) return interaction.reply({ ephemeral: true, content: "<:M_x:950441844544794654> **I'm not connected somewhere!**"}).catch(() => null);
        if(oldConnection && oldConnection.joinConfig.channelId != interaction.member.voice.channelId) return interaction.reply({ ephemeral: true, content: "<:M_x:950441844544794654> **We are not in the same Voice-Channel**!"}).catch(() => null);
        
        const queue = client.queues.get(interaction.guild.id); // get the queue
        if(!queue || !queue.tracks || !queue.tracks[0]) { 
            return interaction.reply({ ephemeral: true, content: `<:M_x:950441844544794654> **Nothing playing right now**`}).catch(() => null);
        }
        const song = queue.tracks[0];
        const curPos = oldConnection.state.subscription.player.state.resource.playbackDuration;
        
        const songEmbed = new MessageEmbed().setColor(`${ee.color}`)
            .setTitle(`${song.title}`)
            .setURL(client.getYTLink(song.id))
            .addField(`ℹ️ **Upload-Channel:**`, `> ${song ? `[${song.channel.name}](${song.channel.url})` : `\`Unknown\``}`, true)
            .addField(`📅 **Upload-At:**`, `> ${song.uploadedAt}`, true)
            .addField(`💯 **Requester:**`, `> ${song.requester} \`${song.requester.tag}\``, true)
            .addField(`⏳ **Duration:**`, `> ${client.createBar(song.duration, curPos)}\n> **${client.formatDuration(curPos)} / ${song.durationFormatted}**`)
        if(song?.thumbnail?.url) songEmbed.setImage(`${song?.thumbnail?.url}`);

        return interaction.reply({ ephemeral: false, content:`ℹ️ **Nowplaying Track**`, embeds: [songEmbed]}).catch(() => null);
    },
};