const Commando = require('discord.js-commando');
const moment = require('moment');
const os = require('os');

module.exports = class InfoCommand extends Commando.Command {

	constructor(client) {
		super(client, {
			name: 'info',
			aliases: ['about', 'status', 'uptime'],
			group: 'basic',
			memberName: 'info',
			description: 'Gives some basic info about the bot'
		});
	}

	async run(msg) {
		await msg.replyEmbed(generateEmbed(msg.client));
	}
}

function generateEmbed(client) {
	let embed = {
		"color": 65484,
		"footer": {
		  "icon_url": client.users.get(client.options.owner).avatarURL,
		  "text": "<3#3333 made this :^)"
		},
		"thumbnail": {
		  "url": client.user.avatarURL
		},
		"fields": [
		  {
			"name": "Support Server:",
			"value": `[${client.guilds.get(client.options.supportId)}](${client.options.supportInvite})`
		  },
		  {
			"name": "Repo:",
			"value": client.options.repo,
		  },
		  {
			"name": "Invite this bot!",
			"value": `[Just click here!](${client.options.oauthURL})`
		  },
		  {
			"name": "Guilds:",
			"value": client.guilds.size,
			"inline": true
		  },
		  {
			"name": "Users:",
			"value": client.users.size,
			"inline": true
		  },
		  {
			"name": "Ping:",
			"value": `${client.ping} ms`,
			"inline": true
		  },
		  {
			"name": "Bot Uptime:",
			"value": moment().subtract(process.uptime(), 'seconds').calendar(),
			"inline": true
		  },
		  {
			"name": "Server Uptime:",
			"value": moment().subtract(os.uptime(), 'seconds').calendar(),
			"inline": true
		  },
		]
	  };
	  return embed
}
