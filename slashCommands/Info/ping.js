const emoji = require('../../botconfig/emoji.json');
const config = require('../../botconfig/config.json')
const embed = require('../../botconfig/embed.json')

module.exports = {
    name: "ping",
    description: `Provides You With The Bot's Ping :)`,
    run: async ( client, interaction, args, prefix ) => {
        interaction.reply({
            ephemeral: true,
            content: `${emoji.ping} **My Current Ping Is \`${client.ws.ping}ms\`! \n Great? **`
        }).catch(() => mull);
        return;
    }
}