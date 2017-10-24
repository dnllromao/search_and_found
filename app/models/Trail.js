import mongoose from 'mongoose';


const trailSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim : true,
		//match: new RegExp(/(<([^>]+)>)/, "i")
	},
	description: String,
	city: String,
	distance: {
		type: Number,
		required: true,
		min: 0
	},
	duration: {
		hours: Number,
		minutes: Number
	}
});

const Trail = mongoose.model('Trail', trailSchema);

module.exports = Trail;