const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { Command } = require('discord.js-commando')

module.exports = class InfoCommand extends Command {

	constructor(client) {
		super(client, {
			name: 'run',
			group: 'owner',
			memberName: 'run',
			description: 'Run a command on the host server',
			ownerOnly: true,
			
			args: [
				{
					key: 'script',
					prompt: 'What do you wanna run?',
					type: 'string',
				}
			]
		});
	}

	async run(msg, args) {
		const { stdout, stderr } = await exec(args.script);
		console.log(args.str)
		if (!stdout && !stderr) await msg.reply(`no reply`);
		if (stdout) await msg.reply(`\`\`\`\n${stdout}\`\`\``);
		if (stderr) await msg.reply(`\`\`\`\n${stderr}\`\`\``);
	}
}
