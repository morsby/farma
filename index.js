const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, {
	useMongoClient: true,
	promiseLibrary: global.Promise
});

const app = express();

// use the authRoutes
require('./routes/apiRoutes')(app);

if (process.env.NODE_ENV === 'production') {
	// Express will serve prod. assets
	// (js, css files)
	app.use(express.static('client/build'));

	// Express will serve up index.html if
	// unknown route
	// Catchall case, only happens if all above
	// failed
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
