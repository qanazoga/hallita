const { Command } = require('discord.js-commando')
const { generateBaroEmbed } = require('../../util/warframe/baroEmbedBuilder')

module.exports = class BaroCommand extends Command {

	constructor(client) {
		super(client, {
			name: 'baro',
			group: 'warframe',
			memberName: 'baro',
			description: 'Gets current stats on Baro Ki\'Teer, the void trader.',
		});
	}

	async run(msg) {
		await msg.channel.send(await generateBaroEmbed(msg.client));
	}
}