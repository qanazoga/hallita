const moment = require('moment');
const path = require('path');
const fetch = require('node-fetch');
const { RichEmbed } = require('discord.js');
const { baseEmbed } = require('../embed/baseEmbedBuilder')

module.exports = {
	async generateBaroEmbed(client) {
		const pl = await fetch('https://api.warframestat.us/pc/voidTrader')
    const baro = await pl.json()
    
		if (baro.active) {
			return await activeBaroEmbedBuilder(client, baro);
		} else {
			return await inactiveBaroEmbedBuilder(client, baro);
		}
	}
}

function activeBaroEmbedBuilder(client, baro) {
  const ducatsEmoji = client.guilds.get(client.options.testServer).emojis.find(emoji => emoji.name == 'ducats');
  const creditsEmoji = client.guilds.get(client.options.testServer).emojis.find(emoji => emoji.name == 'credits');

  function baseBaroEmbed() { 
    return baseEmbed(client)
      .setTitle('**Baro is Here!**')
      .setThumbnail('http://content.warframe.com/MobileExport/Lotus/Interface/Icons/Player/BaroKiteerAvatar.png')
      .setDescription(`He leaves ${moment(baro.expiry).fromNow()}.`);
  }

  let embeds = [];
  let currentEmbed = baseBaroEmbed();
  while (baro.inventory.length > 0) {
    
    if (currentEmbed.fields.length == 25) {
      embeds.push(currentEmbed);
      currentEmbed = baseBaroEmbed();
    }
    const treasure = baro.inventory.shift();
    currentEmbed.addField(`${treasure.ducats}${ducatsEmoji} ${treasure.credits}${creditsEmoji}`, treasure.item, true);
  }
  embeds.push(currentEmbed);
  return embeds;
}

function inactiveBaroEmbedBuilder(client, baro) {
  let arrival = moment(baro.activation).fromNow();
  const embed = baseEmbed(client)
  embed
    .setTitle("**Baro isn't here**")
    .setDescription(`He will be back in ${arrival}.`)
    .attachFile(path.join(path.resolve(), 'src/rsc/no_baro.png'))
    .setThumbnail("attachment://no_baro.png");

    return [embed];
}