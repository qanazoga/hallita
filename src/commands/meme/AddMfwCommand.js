const { Command } = require('discord.js-commando');
const path = require('path');
const { downloadFile } = require('../../util/EZDownload');

module.exports = class AddMfwCommand extends Command {
	constructor(client) {
		super(client, {
			ownerOnly: true,
			name: 'add-mfw',
			aliases: ['addmfws'],
			group: 'meme',
			memberName: 'add-mfw',
			description: 'Adds an image to the mfw reaction library',

			args: [
				{
					key: 'url',
					prompt: 'what\'s the image URL?',
					type: 'string',
					default: '',
				},
			],
		});
	}

	async run(msg, args) {
		/**
		 * @param {Command.msg} msg
		 */
		const filepath = path.join(path.resolve(), 'src/rsc/mfw');

		const url = (msg.attachments.size > 0) ? msg.attachments.first().url : args.url;
		const filename = (msg.attachments.size > 0) ? msg.attachments.first().filename : url.slice(url.lastIndexOf('/') + 1);

		await downloadFile(url, filepath, filename);
		await msg.react('👍');
	}
};
