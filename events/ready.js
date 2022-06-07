const config = require('../botconfig/config.json');
const moment = require("moment");
const Discord = require("discord.js")
const { nFormatter } = require(`../utils/functions.js`);

module.exports = (client) => {
    //Console Logging
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
    //Bot Info In Console
    console.table({
        'Bot User:': `${client.user.tag}`,
        'Guild(s):': `${client.guilds.cache.size} Servers`,
        'Watching:': `${client.guilds.cache.reduce((a, b) => a + b?.memberCount, 0)} Members`,
        'Prefix:': `${config.prefix}`,
        'Commands:': `${client.commands.size}`,
        'Discord.js:': `v${Discord.version}`,
        'Node.js:': `${process.version}`,
        'Plattform:': `${process.platform} ${process.arch}`,
        'Memory:': `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`
    });
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`${client.user.tag}, Ready To Help ${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)} Users In ${client.guilds.cache.size} Server.\n Lets Go!`);




    //Activity Status Settings
    change_status(client);
    //loop through the status per each 10 minutes
    setInterval(() => {
        change_status(client);
    }, 90 * 1000);

}

//Change Status
var state = false;
function change_status(client) {
    const config = require(`${process.cwd()}/botconfig/config.json`)
    if (!state) {
        client.user.setActivity(`${config.status.text}`
            .replace("{prefix}", config.prefix)
            .replace("{guildcount}", nFormatter(client.guilds.cache.size, 2))
            .replace("{membercount}", nFormatter(client.guilds.cache.reduce((a, b) => a + b?.memberCount, 0), 2))
            .replace("{created}", moment(client.user.createdTimestamp).format("DD/MM/YYYY"))
            .replace("{createdime}", moment(client.user.createdTimestamp).format("HH:mm:ss"))
            .replace("{name}", client.user.username)
            .replace("{tag}", client.user.tag)
            .replace("{commands}", client.commands.size)
            , { type: config.status.type, url: config.status.url });
    } else {
        client.user.setActivity(`${config.status.text2}`
            .replace("{prefix}", config.prefix)
            .replace("{guildcount}", nFormatter(client.guilds.cache.size, 2))
            .replace("{membercount}", nFormatter(client.guilds.cache.reduce((a, b) => a + b?.memberCount, 0), 2))
            .replace("{created}", moment(client.user.createdTimestamp).format("DD/MM/YYYY"))
            .replace("{createdime}", moment(client.user.createdTimestamp).format("HH:mm:ss"))
            .replace("{name}", client.user.username)
            .replace("{tag}", client.user.tag)
            .replace("{commands}", client.commands.size)
            , { type: config.status.type, url: config.status.url });
    }
    state = !state;


}