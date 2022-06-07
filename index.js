const { Client, Intents, Collection } = require('discord.js');
const config = require('./botconfig/config.json');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ],

    partials: ["MESSAGE", "CHANNEL", "REACTION"],

    failIfNotExists: false,

    allowedMentions: {
        parse: ["roles", "users"],
        repliedUser: false,
    },

    shards: "auto",
    presence: {
        activities: [{ name: `${config.status.text}`.replace("{prefix}", config.prefix), type: config.status.type, url: config.status.url }],
        status: "online"
    }

})
client.config = config;

//Types Of Collection
client.commands = new Collection();
client.slashCommands = new Collection();

//slashCommands Settings
client.deploySlash = {
    enabled: true,
    guild: false,
}


//Importing the Handler
require('./utils/handler.js')(client);

client.login(config.token);