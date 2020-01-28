const { Command } = require('discord.js-commando');
const path = require('path');
const { downloadFile } = require('../../util/EZDownload');

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
		await downloadFile(msg.attachments.first().url, filepath, msg.attachments.first().filename);
		await msg.react('👍');
	}
};
