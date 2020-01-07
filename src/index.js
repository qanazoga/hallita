const { CommandoClient } = require('discord.js-commando');
const  { commandPrefix, owner, oauthURL, supportInvite, supportId, repo, token } = require('./config/config.json');
const fs = require('fs');
const path = require('path');

const client = new CommandoClient({
	commandPrefix: commandPrefix,
	owner: owner,
	oauthURL: oauthURL,
	supportInvite: supportInvite,
	supportId: supportId,
	repo: repo,
});

client.registry
	.registerGroups([
		['owner', 'Owner Only Commands'],
		['basic', 'Basic Commands'],
		['warframe', 'Warframe'],
	])
	.registerDefaultTypes()
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
	console.log('Logged In!');
	client.user.setActivity(`prefix: ${client.commandPrefix}`);
});

fs.readdir(path.join(__dirname, 'events'), (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		if (!file.endsWith(".js")) return;
		const event = require(`./events/${file}`);
		let eventName = file.split(".")[0];
		client.on(eventName, event.bind(null, client));
		delete require.cache[require.resolve(`./events/${file}`)];
	});
});
  
client.login(token);
