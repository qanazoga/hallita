const { Command } = require('discord.js-commando');

module.exports = class RestartCommand extends Command {

	constructor(client) {
		super(client, {
			name: 'restart',
			aliases: ['power', 'off'],
			group: 'owner',
			memberName: 'restart',
			description: 'Restarts the bot',
			ownerOnly: true,
		});
	}

	async run(msg) {
		await msg.channel.send('👋');
		process.exit();
	}
};
