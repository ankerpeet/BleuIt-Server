let session = require('express-session');
let MongoDBStore = require('connect-mongodb-session')(session);

let store = new MongoDBStore(
	{
		uri: 'mongodb://student:student@ds013414.mlab.com:13414/planets',
		collection: 'Sessions'
	});

// Catch errors 
store.on('error', function (error) {
	console.error('SESSSION ERROR:', error);
});

module.exports = session({
	secret: 'It\'s dangerous to go alone',
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
	},
	store: store,
	resave: true,
	saveUninitialized: true
})