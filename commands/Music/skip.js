const { getVoiceConnection } = require("@discordjs/voice");
module.exports = {
    name: "skip",
    category: "Music",
    aliases: ["s", "fs", "forceskip"],
    description: "Skips the current Track",
    run: async (client, message, args, prefix) => {
        if(!message.member.voice.channelId) return message.reply("<:M_x:950441844544794654> **Please join a Voice-Channel first!**").catch(() => null);
        // get an old connection
        const oldConnection = getVoiceConnection(message.guild.id);
        if(!oldConnection) return message.reply("<:M_x:950441844544794654> **I'm not connected somewhere!**").catch(() => null);
        if(oldConnection && oldConnection.joinConfig.channelId != message.member.voice.channelId) return message.reply("<:M_x:950441844544794654> **We are not in the same Voice-Channel**!").catch(() => null);
        
        const queue = client.queues.get(message.guild.id); // get the queue
        if(!queue) { 
            return message.reply(`<:M_x:950441844544794654> **Nothing playing right now**`).catch(() => null);
        }
        // no new songs (and no current)
        if(!queue.tracks || queue.tracks.length <= 1) { 
            return message.reply(`<:M_x:950441844544794654> **Nothing to skip**`).catch(() => null);
        }
        queue.skipped = true;
        // skip the track
        oldConnection.state.subscription.player.stop();
        
        return message.reply(`⏭️ **Successfully skipped the Track**`).catch(() => null);
    },
};