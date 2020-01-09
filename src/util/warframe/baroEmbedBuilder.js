const moment = require('moment');
const path = require('path');
const fetch = require('node-fetch');
const { RichEmbed } = require('discord.js');
const { baseEmbed } = require('../embed/baseEmbedBuilder')

module.exports = {
	async generateBaroEmbed(client) {
		const pl = await fetch('https://api.warframestat.us/pc/voidTrader')
    const baro = 
    // Debug payload
    /**
    {"id": "string","activation": "2020-01-09T01:02:31Z","expiry": "2020-01-10T01:02:31Z","character": "string","location": "string","inventory":[{"item": "big gun","ducats": 200,"credits": 400},{"item": "big gun","ducats": 200,"credits": 400},{"item": "big gun","ducats": 200,"credits": 400},{"item": "big gun","ducats": 200,"credits": 400},{"item": "big gun","ducats": 200,"credits": 400},{"item": "big gun","ducats": 200,"credits": 400},{"item": "big gun","ducats": 200,"credits": 400},{"item": "big gun","ducats": 200,"credits": 400},{"item": "cool mod","ducats":150,"credits":5000}],"psId": "string","active": true,"startString": "string","endString":"string"}
       */
     await pl.json()
    
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

  const baroBaseEmbed = baseEmbed(client)
    .setTitle('**Baro is Here!**')
    .setThumbnail('http://content.warframe.com/MobileExport/Lotus/Interface/Icons/Player/BaroKiteerAvatar.png')
    .setDescription(`He leaves ${moment(baro.expiry).fromNow()}.`);

  for (let treasure of baro.inventory) {
    baroBaseEmbed.addField(`${treasure.ducats}${ducatsEmoji} ${treasure.credits}${creditsEmoji}`, treasure.item, true);
  }

  return [baroBaseEmbed]
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