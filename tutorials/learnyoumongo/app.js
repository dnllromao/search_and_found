const mongo = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/learnyoumongo";

// SELECT
 const arg = process.argv[2];
mongo.connect(url, function(err,db) {
	if(err) throw err;

	const parrots = db.collection('parrots');

	parrots.find({
		age: { $gt: parseInt(arg) } // use parseInt() to translate string to integer or {$gt: +age}
	},
	{
		_id: 0,
		name: 1,
		age: 1
	}).toArray(function(err, docs) {
		if(err) throw err;
		console.log(docs);
		db.close();
	});
});

// INSERT
const firstName = process.argv[2];
const lastName = process.argv[3];
mongo.connect(url, function(err,db) {
	if(err) throw err;

	const collection = db.collection('docs');
	let doc = {
		firstName: firstName,
		lastName: lastName
	}

	collection.insert(doc, function(err, data) {
		if(err) throw err;
		console.log(JSON.stringify(doc));
		db.close();
	});
});


// UPDATE
mongo.connect(url, function(err,db) {
	if(err) throw err;

	const collection = db.collection('users');
	
	collection.update({
		username: 'tinatime'
	}, {
		$set: {
			age: 40
		}
	}, function(err) {
		if(err) throw err;
		db.close();
	});
});

// REMOVE
const collectionName = process.argv[3];
const id = process.argv[4];
mongo.connect(url, function(err,db) {
	if(err) throw err;

	const collection = db.collection(collectionName);
	collection.remove({
		_id: id
	}, function(err) {
		if(err) throw err;
		db.close();
	});
});

// COUNT
const arg = process.argv[2];
mongo.connect(url, function(err,db) {
	if(err) throw err;

	const collection = db.collection('parrots');
	collection.count({
		age: { $gt: +arg}
	}, function(err, count) {
		if(err) throw err;
		console.log(count);
		db.close();
	});
});

// AGGREGATION
const size = process.argv[2];
mongo.connect(url, function(err,db) {
	if(err) throw err;

	const collection = db.collection('prices');
	collection.aggregate([
		{ $match: { size: size} },
		{ $group: {
			_id: 'average',
			total: { $avg: '$price'}
		}}
	]).toArray(function(err, results) {
		if(err) throw err;
		if(!results.length) {
			throw new Error('No results found');
		}
		console.log(Number(results[0].total).toFixed(2));
		db.close();
	});
});