const mongoose = require('mongoose');

const trailSchema = mongoose.Schema({
	title: String,
	description: String
});

const Trail = mongoose.model('Trail', trailSchema);

module.exports = Trail;