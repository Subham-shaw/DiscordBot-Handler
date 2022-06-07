const { getVoiceConnection } = require("@discordjs/voice");
module.exports = {
    name: "skip",
    description: "Skips the current Track",
    run: async (client, interaction, args, prefix) => {
        if(!interaction.member.voice.channelId) return interaction.reply({ ephemeral: true, content: "<:M_x:950441844544794654> **Please join a Voice-Channel first!**"}).catch(() => null);
        // get an old connection
        const oldConnection = getVoiceConnection(interaction.guild.id);
        if(!oldConnection) return interaction.reply({ ephemeral: true, content: "<:M_x:950441844544794654> **I'm not connected somewhere!**"}).catch(() => null);
        if(oldConnection && oldConnection.joinConfig.channelId != interaction.member.voice.channelId) return interaction.reply({ ephemeral: true, content: "<:M_x:950441844544794654> **We are not in the same Voice-Channel**!"}).catch(() => null);
        
        const queue = client.queues.get(interaction.guild.id); // get the queue
        if(!queue) { 
            return interaction.reply({ ephemeral: true, content: `<:M_x:950441844544794654> **Nothing playing right now**`}).catch(() => null);
        }
        // no new songs (and no current)
        if(!queue.tracks || queue.tracks.length <= 1) { 
            return interaction.reply({ ephemeral: true, content: `<:M_x:950441844544794654> **Nothing to skip**`}).catch(() => null);
        }
        queue.skipped = true;
        // skip the track
        oldConnection.state.subscription.player.stop();
        
        return interaction.reply({ ephemeral: false, content: `⏭️ **Successfully skipped the Track**`}).catch(() => null);
    },
};