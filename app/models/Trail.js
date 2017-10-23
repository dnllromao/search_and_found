import mongoose from 'mongoose';


const trailSchema = mongoose.Schema({
	title: String,
	description: String,
	city: String,
	distance: Number,
	duration: {
		hours: Number,
		minutes: Number
	}
});

const Trail = mongoose.model('Trail', trailSchema);

module.exports = Trail;