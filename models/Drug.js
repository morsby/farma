const mongoose = require('mongoose');
const { Schema } = mongoose;

const drugSchema = new Schema({
	name: String,
	important: Boolean,
	chapters: Array,
	preview: String,
	content: String
});

module.exports = mongoose.model('drugs', drugSchema);
