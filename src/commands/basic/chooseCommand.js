const { Command } = require('discord.js-commando');
const { randChoice } = require('../../util/smoothbrain')
const {stripIndent }= require('common-tags');

module.exports = class ChooseCommand extends Command {

	constructor(client) {
		super(client, {
			name: 'choose',
			aliases: ['pick'],
			group: 'basic',
			memberName: 'choose',
            description: 
                stripIndent`
                Feeling indecisive? Let me pick for you!
                If a choice is more than one word, wrap it in quotes.`,
            examples: [
                'choose "go to bed" "stay up for one more game"',
                'choose League DotA "something good"'],

            args: [
				{
					key: 'options',
                    prompt: 'What am I picking between?',
                    type: 'string',
                    infinite: true,
				}
			]
            
            
		});
	}

	async run(msg, args) {
        
		await msg.reply(`I pick ${randChoice(args.options)}.`);
	}
}
