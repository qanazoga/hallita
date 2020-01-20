const { Command } = require('discord.js-commando');
const { randChoice } = require('big-brain.js');

module.exports = class ChooseCommand extends Command {

	constructor(client) {
		super(client, {
			name: 'eightball',
			aliases: ['8ball', 'eight-ball', 'magicconch', 'magic-conch'],
			group: 'basic',
			memberName: 'eightball',
			description: 'Ask any question and recieve an answer from beyond!',
		});
	}

	async run(msg) {
		const eightball = [
			'It is certain.',
			'It is decidedly so.',
			'Without a doubt.',
			'Yes - definitely.',
			'You may rely on it.',
			'As I see it, yes.',
			'Most likely.',
			'Outlook good.',
			'Yes.',
			'Signs point to yes.',
			'Reply hazy, try again.',
			'Ask again later.',
			'Better not tell you now.',
			'Cannot predict now.',
			'Concentrate and ask again.',
			'Don\'t count on it.',
			'My reply is no.',
			'My sources say no.',
			'Outlook not so good.',
			'Very doubtful.',
		];

		await msg.reply(`🎱\n\t${randChoice(eightball)}`);
	}
};
