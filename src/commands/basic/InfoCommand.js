const { Command } = require('discord.js-commando');
const { baseEmbed } = require('../../util/embed/baseEmbedBuilder');
const moment = require('moment');
const os = require('os');

module.exports = class InfoCommand extends Command {

	constructor(client) {
		super(client, {
			name: 'info',
			aliases: ['about', 'status', 'uptime'],
			group: 'basic',
			memberName: 'info',
			description: 'Gives some basic info about the bot',
		});
	}

	async run(msg) {
		await msg.embed(generateEmbed(msg.client));
	}
};

function generateEmbed(client) {
	const embed = baseEmbed(client);

	embed.setThumbnail(client.user.avatarURL)
		.addField('Support Server:', `[${client.guilds.get(client.options.supportServer).name}](${client.options.supportInvite})`)
		.addField('repo', client.options.repo)
		.addField('Invite this bot!', `[Just click here!](${client.options.oauthURL})`)
		.addField('Guilds:', client.guilds.size, true)
		.addField('Users:', client.users.size, true)
		.addField('Ping:', `${Math.floor(client.ping)} ms`, true)
		.addField('Bot Live Since:', moment().subtract(process.uptime(), 'seconds').fromNow(), true)
		.addField('Server Live Since:', moment().subtract(os.uptime(), 'seconds').fromNow(), true);
	return embed;
}
