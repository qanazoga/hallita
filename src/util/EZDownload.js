const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

module.exports = {
	async downloadFile(URL, writePath, fileName) {
		if (!fs.existsSync(writePath)) throw Error(`The path ${writePath} is invalid.`);

		const res = await fetch(URL);
		const dest = fs.createWriteStream(path.join(writePath, fileName));
		await res.body.pipe(dest);
	},
};
