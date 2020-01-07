const { Embed } = require('discord.js-commando');

module.exports = function generateBaroEmbed(baro) {
	if (baro.active) {
		return activeBaro(baro);
	} else {
		return inactiveBaro(baro);
	}
}

function activeBaro() {
	
}

function inactiveBaro(baro) {

}
