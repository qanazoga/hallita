const { Command } = require('discord.js-commando');
const { loadImage, createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');


module.exports = class JayPegCommand extends Command {

	constructor(client) {
		super(client, {
			name: 'jaypeg',
			aliases: ['jpg', 'jpeg', 'jpeg', 'needsmorejpeg'],
			group: 'meme',
			memberName: 'jaypeg',
			description: 'Turns an image into this: <https://www.youtube.com/watch?v=QEzhxP-pdos>',

			args: [
				{
					key: 'image',
					prompt: 'what do you want JPEG\'ed?',
					type: 'string',
					label: 'url or image',
					default: '',
				},
				{
					key: 'quality',
					prompt: 'how badly do you want it JPEG\'ed?',
					type: 'integer',
					label: 'corruption percentage',
					default: 60,
					validate: quality => quality >= 0,
				},
			],
		});
	}

	async run(msg, args) {
		const url = (msg.attachments.size) ? msg.attachments.first().url : args.image;

		if (url === '') {
			await msg.say('Send me an image!');
			return;
		}

		console.log(args.quality);
		console.log(101 - args.quality);
		console.log((101 - args.quality) / 1000);
		const quality = (101 - args.quality) / 1000;
		console.log(quality);
		await jaypegify(url, quality);
		await msg.say('', {
			files:
				[
					path.join(__dirname, 'jaypeg.jpeg'),
				],
		});
	}
};


async function jaypegify(url, quality) {
	const img = await loadImage(url);
	const canvas = createCanvas(img.width, img.height);
	const newImage = canvas.getContext('2d');
	newImage.drawImage(img, 0, 0, canvas.width, canvas.height);
	const out = fs.createWriteStream(__dirname + '/jaypeg.jpeg');
	const stream = canvas.createJPEGStream({
		quality: quality,
	});
	stream.pipe(out);
}

