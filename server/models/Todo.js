const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let todoSchema = Schema({
	title: { type: String, required: true },
	isCompleted: { type: Boolean},
	time: {type: Number}
});

let Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;