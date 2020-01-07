module.exports = async (client, message) => {
	if (message.author.bot) return;
	console.log(`[Message] ${message.author.username}#${message.author.discriminator}:\t${message.cleanContent}`);
};
