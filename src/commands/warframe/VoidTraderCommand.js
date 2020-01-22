const { Command } = require('discord.js-commando');
const { generateBaroEmbed } = require('../../util/warframe/baroEmbedBuilder');

module.exports = class BaroCommand extends Command {

	constructor(client) {
		super(client, {
			name: 'void-trader',
			memberName: 'void-trader',
			aliases: ['voidtrader', 'baro'],
			group: 'warframe',
			description: 'Gets current stats on Baro Ki\'Teer, the void trader.',
		});
	}

	async run(msg) {
		const embeds = await generateBaroEmbed(msg.client);
		for (const embed of embeds) {
			await msg.embed(embed);
		}
	}
};