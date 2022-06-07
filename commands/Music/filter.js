const { getVoiceConnection } = require("@discordjs/voice");
const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require("discord.js");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "filter",
    description: "Applys/Removes Filters of the Queue",
    category: "Music",
    run: async (client, message, args, prefix) => {
        try {
            if (!message.member.voice.channelId) return message.reply({ content: "<:M_x:950441844544794654> **Please join a Voice-Channel first!**" }).catch(() => null);
            const oldConnection = getVoiceConnection(message.guild.id);
            if (!oldConnection) return message.reply({ content: `<:M_x:950441844544794654> **I'm not connected somewhere**!` }).catch(() => null);

            const queue = client.queues.get(message.guild.id);
            if (!queue) return message.reply({ content: `<:M_x:950441844544794654> **I'm nothing playing right now.**` }).catch(() => null);

            const options = Object.keys(queue.effects)

            const Menu = new MessageSelectMenu()
                .setCustomId("filter_changing")
                .setPlaceholder("Pic Filters to enable/disable")
                .setMaxValues(options.filter(o => o != "bassboost" && o != "speed").length)
                .addOptions(options.filter(o => o != "bassboost" && o != "speed").map(option => {
                    return {
                        label: `${option.charAt(0).toUpperCase()}${option.slice(1)}`,
                        value: option,
                        description: `${queue.effects[option] ? `Enabled: ` : `Disabled: `} A ${option}-ish Audio-Effect`,
                        emoji: queue.effects[option] ? `✅` : "❌"
                    }
                }))
            const msg = await message.channel.send({
                content: "🔗 Pick what filter(s) you want to change!",
                components: [new MessageActionRow().addComponents(Menu)]
            }).catch(console.error)
            if (!msg) return;
            const collector = msg.createMessageComponentCollector({
                filter: (i => i.isSelectMenu() && i.customId == "filter_changing" && i.user.id == message.author.id),
                time: 60_000,
                max: 1
            })
            collector.on("collect", i => {
                i.values.forEach(option => queue.effects[option] = !queue.effects[option])
                i.reply({
                    content: `Changed ${i.values.length} Filter(s) to:\n> *Will be applied with the next Skip*`,
                    embeds: [
                        new MessageEmbed()
                            .setColor(`${ee.color}`)
                            .setTitle("Current Filters")
                            .setDescription(Object.keys(queue.effects).filter(o => o != "bassboost" && o != "speed").map(option => `> **\`${option.charAt(0).toUpperCase()}${option.slice(1)}\`** - ${queue.effects[option] ? `✅ Enabled` : `❌ Disabled:`}`).join("\n\n"))
                    ]
                })
                // will be removed on .stop();
                queue.tracks = [queue.tracks[0], ...queue.tracks];
                queue.filtersChanged = true;
                const curPos = oldConnection.state.subscription.player.state.resource.playbackDuration;
                oldConnection.state.subscription.player.stop();
                oldConnection.state.subscription.player.play(client.getResource(queue, queue.tracks[0].id, curPos));
            })
            collector.on("end", e => {
                msg.edit({
                    content: msg.content,
                    components: [new MessageActionRow().addComponents(Menu.setDisabled(true))]
                }).catch(() => null)
            })
        } catch (e) {
            console.error(e);
            message.reply({ content: `❌ Something went wrong: \`\`\`${e.message || e}`.substring(0, 1950) + `\`\`\`` }).catch(() => null);
        }
    },
};