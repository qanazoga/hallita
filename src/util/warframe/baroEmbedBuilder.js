const moment = require('moment');
const path = require('path')
const fetch = require('node-fetch')

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

async function inactiveBaroEmbedBuilder(client, baro) {
	console.log(baro);
    let arrival = moment(baro.activation).fromNow();
    const embed = {
        "title": "**Baro isn't here**",
        "description": `He will be back in ${arrival}.`,
        "color": 65484,
        "timestamp": moment().format(),
        "footer": {
          "icon_url": client.users.get(client.options.owner).avatarURL,
          "text": "<3#3333 made this"
        },
        "thumbnail": {
          "url": "attachment://baro.jpg"
        }
      };
    
      return {files: [path.join(path.resolve(), 'src/rsc/baro.jpg')], embed: embed };
}
