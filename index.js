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

const PORT = process.env.PORT || 5000;
app.listen(PORT);
