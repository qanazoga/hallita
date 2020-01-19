module.exports = async client => {
	console.log(`${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`);
};
