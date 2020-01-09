const { RichEmbed } = require('discord.js');
const moment = require('moment');

module.exports =  {
    baseEmbed(client) {
        const embed = new RichEmbed({
            "color": 65484,
            "footer": {
                "icon_url": client.users.get(client.options.owner).avatarURL,
                "text": "<3#3333 made this (◍•ᴗ•◍)"
            },
            "timestamp": moment().format(),
        });
        return embed;
    }
}