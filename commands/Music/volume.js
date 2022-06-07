const { getVoiceConnection } = require("@discordjs/voice");
module.exports = {
    name: "volume",
    aliases: ["vol"],
    category: "Music",
    description: "Changes the Volume of the Music",
    run: async (client, message, args, prefix) => {
        if(!message.member.voice.channelId) return message.reply("<:M_x:950441844544794654> **Please join a Voice-Channel first!**").catch(() => null);
        // get an old connection
        const oldConnection = getVoiceConnection(message.guild.id);
        if(!oldConnection) return message.reply("<:M_x:950441844544794654> **I'm not connected somewhere!**")
        if(oldConnection && oldConnection.joinConfig.channelId != message.member.voice.channelId) return message.reply("<:M_x:950441844544794654> **We are not in the same Voice-Channel**!").catch(() => null);
        
        const queue = client.queues.get(message.guild.id); // get the queue
        if(!queue) { 
            return message.reply(`<:M_x:950441844544794654> **Nothing playing right now**`);
        }
        if(!args[0] || isNaN(args[0]) || Number(args[0]) < 1 || Number(args[0]) > 150) return message.reply(`<:M_x:950441844544794654> **No __valid__ Volume between 1 and 100 % provided!** Usage: \`${prefix}volume 25\``).catch(() => null);
        const volume = Number(args[0]);
        queue.volume = volume;

        // change the volume
        oldConnection.state.subscription.player.state.resource.volume.setVolume(volume / 100);
        
        return message.reply(`🔊 **Successfully changed the Volume to \`${volume}%\`**`).catch(() => null);
    },
};