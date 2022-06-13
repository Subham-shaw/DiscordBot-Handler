# Important notes and thank ❤️
First Of All Thank you So Much For Using My Command Handler.

**Note**:- **If You Want A Bot With Mulltiple Commands Made With this Command Handler, Star This Repostory On Github. On 50 Stars You Will Get A Bot With Multiple Commands Like Voice Channel Games, Administration, etc.**


# Installation Guide 🔥
## ✅ Hosting Requirements

<details>
<summary>Click To Expand</summary>

* [Node.js](https://nodejs.org) Version 16.6 Or Higher, I Recommend the STABLE Version To Get Rid Of Any Errors.
* A VPS would be advised, so you don't need to keep your PC/laptop/RasPi 24/7 online! 
* If You Have A VPS Then See This [VPS Ubuntu Setup Guide](/#-VPS-Ubuntu-Setup-Guide) 

</details>


## 🤖 Configuration 

<details>
<summary>Click To Expand</summary>

1. `./botconfig/config.json`
    * `token` you can get from: [Discord-Developers-Portal](https://discord.com/developers/applications)
    * `prefix` is the command prefix, you can change it to whatever you want.
    * `ownerID` is the ID of the owner of the bot.
    * `status` is the status of the bot. You Can Change the `text1` and `text2` In The following Things Which Are predefined in ./events/ready.json [`{prefix}`, `{guildcount}`, `{membercount}`, `{created}`, `{createdime}`, `{name}`, `{tag}`, `{commands}`].

2. `./botconfig/emoji.json`
    * Fill the emojies You Want
    * Dont Keep It Blank !!!!

3. `./botconfig/embed.json`
    * `color` is the color of the embed.
    * `name` is the name of the bot.

</details>

# 🌟 Startup And Errors

<details>
<summary>Click To Expand</summary>

1. Package Installation 
    * Type The Following In Your Console Or Terminal To Install The Required Packages
    ```

    npm i @discordjs/opus @discordjs/voice cron discord-ytdl-core discord.js ffmpeg-static fs libsodium-wrappers moment ms youtube-sr ytdl-core

    ```
    After The Packages Are Installed Ignore The red and yellow errors instead of `npmERR` Errors. 
    If You Are Getting This Kind Of Errors Then You Need to read And Understand What Is The Error Like If Any File Is Missing Or Something Like That.

    * Now, Type The Following In The Console To Start Your Bot
    ```

    node index.js

    ```
    **Note**:- You Can Also Type `node .` To Start The Bot

2. Error Solving 
    * If You Are Getting `node:events` Error While Running `node .` or `node index.js`, Paste This Command In Your Console Or Terminal
    ```

    npm i --save-dev node@lts && npm config set prefix=$(pwd)/node_modules/node && export PATH=$(pwd)/node_modules/node/bin:$PATH

    ```
### You Are Good To Go Now! ✈️


* Still Cant Get Rid OF The Errors? 
    DM Me The Error At `Subham Shaw#1334`. I Will defeanatly help you.

</details>

# 🚀 VPS-Ubuntu-Setup-Guide
<details>
<summary>Click To Expand</summary>

1. Node.js Installation
    * Step 1 – Update the APT index
    ```
    sudo apt update -y  
    sudo apt clean all
    ```

2. Install Node.js from the repository
    * Execute the commands below as root user.
    ```
    curl -fsSL https://deb.nodesource.com/setup_16.x | sudo bash -

    ```    

    * Once the Node.js repository is configured, install Node.js by executing the commands below:
    ```
    apt install -y nodejs vim
    ```

3. Verifing Node.js installation

    * To verify Node.js version:
    ```
    node -v
    ```
    Expected result: 
    ```
    v16.15.1
    ```

    If You Get The Result Something Like This then You Are Good To Go. If NOT Then You Might Not Have upgraded The ubuntu version.

4. Installing pm2 (Process Manager) 
    pm2 Is a Process Manager Which Keeps The Bot On Even IF You Close The Console.

    * To Install pm2:
    ```
    npm i pm2 -g
    ```

5. Starting The Bot 
    * Firstly Head Over The The Directory Where You Have Installed The Code.
    * Then Paste The Following In The Console To Start The Bot
    ```
    pm2 start index.js
    ```

    * Paste This To Stop The Bot
    ```
    pm2 stop 0
    ```
    Or
    ```
    pm2 stop index.js
    ```

    You Are Good To Go Now!

</details>

# Credits
> If you consider using this Handler, make sure to credit me!
> Example: `Bot Coded by Subham Shaw#1334, [modifier/your Name]`
