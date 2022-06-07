const { getVoiceConnection } = require("@discordjs/voice");
module.exports = {
    name: "shuffle",
    description: "Shuffles (mixes) the Queue",
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
        queue.tracks = shuffleArray(queue.tracks);
        
        // shuffled the Queue
        return interaction.reply({ ephemeral: true, content: `🔀 **Successfully shuffled the Queue.**`}).catch(() => null);
    },
};

function shuffleArray(a) {
    let cI = a.length, rI;
    while(cI != 0) {
        rI = Math.floor(Math.random() * cI);
        cI --;
        [a[cI], a[rI]] = [a[rI], a[cI]];
    }
    return a;
}