const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

module.exports = {
	async downloadFile(URL, writePath, fileName) {
		if (!fs.existsSync(writePath)) throw Error('The writepath is invalid.');
		const res = await fetch(URL);

		new Promise((resolve, reject) => {
			const dest = fs.createWriteStream(path.join(writePath, fileName));
			res.body.pipe(dest);
			res.body.on('end', () => resolve('Complete'));
			dest.on('error', reject);
		});
	},
};
