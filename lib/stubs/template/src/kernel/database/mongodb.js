const mongoose = require('mongoose');

module.exports = ({
	username,
	password,
	database,
	host,
	port
}) => {
	const mongoUri = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`;
	mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
		.then(() => console.log('MongoDB connected successfully'))
		.catch(err => console.error('Error connecting to MongoDB:', err));
	mongoose.set('debug', (coll, method, query, doc) => {
		console.log(JSON.stringify({
			"mongoDB": {
				event: `${coll}.${method}`,
				query,
				doc
			}
		}));
	});
	return mongoose
}