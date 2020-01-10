const { Command } = require('discord.js-commando');
const fs = require('fs');
const path = require('path');
const { randChoice } = require('../../util/smoothbrain');

module.exports = class MfwCommand extends Command {

	constructor(client) {
		super(client, {
			name: 'mfw',
			aliases: ['tfw', 'mrw'],
			group: 'meme',
			memberName: 'mfw',
			description: 'Returns a random reaction image.'
		});
	}

	async run(msg) {
        const filepath = path.join(path.resolve(), 'src/rsc/mfw');
        const content = fs.readdirSync(filepath);
        const mfw = randChoice(content)

        await msg.say(
            { files: [
                {
                    attachment: path.join(filepath,mfw),
                    name: mfw,
                }
            ]})
	}
}
