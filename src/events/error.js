module.exports = async (client, error) => {
	console.warn(`An error event was sent by Discord.js: \n${JSON.stringify(error)}`);
};
