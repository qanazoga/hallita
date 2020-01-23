const { Command } = require('discord.js-commando');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

module.exports = class AddMfwCommand extends Command {

	constructor(client) {
		super(client, {
			ownerOnly: true,
			name: 'add-mfw',
			aliases: ['addmfw'],
			group: 'meme',
			memberName: 'add-mfw',
			description: 'Adds an image to the mfw reaction library',
		});
	}

	async run(msg) {
		if (msg.attachments.size == 0) {
			await msg.say('Send me something to add!');
			return;
		}

		const filepath = path.join(path.resolve(), 'src/rsc/mfw');

		fetch(msg.attachments.first().url)
			.then(res => {
				const dest = fs.createWriteStream(path.join(filepath, msg.attachments.first().filename));
				res.body.pipe(dest);
			});

		await msg.react('👍');
	}
};
