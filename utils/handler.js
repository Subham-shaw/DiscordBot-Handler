const { readdirSync } = require("fs");
module.exports = async client => {
    //Conecting Command Folder And Rendering All Files In All Directories By Looping Them
    readdirSync(`${process.cwd()}/commands/`)
        .forEach(directory => {
            const command = readdirSync(`${process.cwd()}/commands/${directory}/`)
                .filter(file => file.endsWith(".js"))
                .forEach(file => {
                    let pull = require(`${process.cwd()}/commands/${directory}/${file}`);
                    client.commands.set(pull.name, pull)

                    const commandName = file.split(".")[0];
                    console.log(`[X]: Loaded Command ${commandName}`);
                })
        })
    //Conecting Events Folder And Rendering All Files
    readdirSync(`${process.cwd()}/events/`).filter(file => file.endsWith(".js"))
        .forEach(file => {
            let pull = require(`${process.cwd()}/events/${file}`);
            let eventName = file.split(".")[0];
            client.on(eventName, pull.bind(null, client));

            console.log(`[X]: Loaded Event ${eventName}`);
        }
        )
    //Conecting SlashCommand Folder And Rendering All Files
    const slashCommandArray = [];
    readdirSync(`${process.cwd()}/slashCommands/`)
        .forEach(directory => {
            const command = readdirSync(`${process.cwd()}/slashCommands/${directory}/`)
                .filter(file => file.endsWith(".js"))
                .forEach(file => {
                    let pull = require(`${process.cwd()}/slashCommands/${directory}/${file}`);
                    client.slashCommands.set(pull.name, pull)
                    slashCommandArray.push(pull)
                })
        })




    //Deploying SlashComands By Checking The Settings
    client.on('ready', () => {
        if (client.deploySlash.enabled) {
            if (client.deploySlash.guild) {
                client.guilds.cache.get(client.deploySlash.guild).commands.set(slashCommandArray);

            } else {
                client.application.commands.set(slashCommandArray);
            }
        }
    })


    //Types Of Handler Error
    //Logging All Types OF Errors In The Console
    process.on('unhandleRejection', (reason, p) => {
        console.log('unhandleRejection', reason)
    })
    process.on('unhandleExcetion', (err, origin) => {
        console.log('unhandleExcetion', err)
    })
    process.on('unhandleExcetionMoniter', (err, origin) => {
        console.log('unhandleExcetionMoniter')
    })

}