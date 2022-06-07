const { getVoiceConnection } = require("@discordjs/voice");
module.exports = {
    name: "resume",
    aliases: ["res", "con", "continue"],
    description: "Resumes the current, paused Track",
    category: "Music",
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
        // if already paused
        if(!queue.paused) return message.reply(`<:M_x:950441844544794654> **Track is not paused**`).catch(() => null);
        
        queue.paused = false;
        
        // skip the track
        oldConnection.state.subscription.player.unpause();
        
        return message.reply(`▶️ **Successfully resumed the Track**`).catch(() => null);
    },
};