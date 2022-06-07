const emoji = require('../../botconfig/emoji.json');
const config = require('../../botconfig/config.json')
const embed = require('../../botconfig/embed.json')


module.exports = {
    name: "ping",
    description: "Provides You With The Bot's Ping",
    category: "Information",
    run: async (client, message) => {
        const pingEmbed = {
            color: embed.color,
            title: `:ping_pong: Pong!`,
            description: `${emoji.ping} My Current Ping Is \`${client.ws.ping}ms\`! \n Great? `,
            footer: `${ee.name} | Made With Love ❌, With Code ✅ | By Subham Shaw#1344`,
    }
        message.reply({embeds: [pingEmbed]})
        .catch((e) => 
            console.log(e)
        );
        return;
    }
}