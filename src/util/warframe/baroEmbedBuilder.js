const moment = require('moment');
const path = require('path');
const fetch = require('node-fetch');
const { baseEmbed } = require('../embed/baseEmbedBuilder');

module.exports = {
	async generateBaroEmbed(client) {
		const pl = await fetch('https://api.warframestat.us/pc/voidTrader');
		const baro = await pl.json();

		if (baro.active) {
			return activeBaroEmbedBuilder(client, baro);
		}
		else {
			return inactiveBaroEmbedBuilder(client, baro);
		}
	},
};

function activeBaroEmbedBuilder(client, baro) {
	const ducatsEmoji = client.guilds.get(client.options.testServer).emojis.find(emoji => emoji.name == 'ducats');
	const creditsEmoji = client.guilds.get(client.options.testServer).emojis.find(emoji => emoji.name == 'credits');

	function baseBaroEmbed() {
		return baseEmbed(client)
			.setTitle('**Baro is Here!**')
			.setThumbnail('http://content.warframe.com/MobileExport/Lotus/Interface/Icons/Player/BaroKiteerAvatar.png')
			.setDescription(`He leaves ${moment(baro.expiry).fromNow()}.`);
	}

	const embeds = [];
	let currentEmbed = baseBaroEmbed();
	while (baro.inventory.length > 0) {
		// Tennocon-proofing
		if (currentEmbed.fields.length == 25) {
			embeds.push(currentEmbed);
			currentEmbed = baseEmbed(client);
			currentEmbed.setThumbnail('http://content.warframe.com/MobileExport/Lotus/Interface/Icons/Player/BaroKiteerAvatar.png');
		}
		const treasure = baro.inventory.shift();
		currentEmbed.addField(`__**${treasure.item}**__`, `${treasure.ducats}${ducatsEmoji} ${treasure.credits}${creditsEmoji}`, true);
	}
	embeds.push(currentEmbed);
	return embeds;
}

function inactiveBaroEmbedBuilder(client, baro) {
	const arrival = moment(baro.activation).fromNow();
	const embed = baseEmbed(client);
	embed
		.setTitle('**Baro isn\'t here**')
		.setDescription(`He will be back in ${arrival}.`)
		.attachFile(path.join(path.resolve(), 'src/rsc/warframe/no_baro.png'))
		.setThumbnail('attachment://no_baro.png');

	return [embed];
}