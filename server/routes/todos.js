const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

router.get('/todos', function(req,res) {
	Todo
		.find({})
		.then(function(todos) {
			res.status(200).json(todos);
		})
		.catch(err => res.status(503).json(err));
});

router.post('/todos', function (req, res) {
    let todo = new Todo(req.body);

    todo
        .save()
        .then( t => res.status(201).json(t))
        .catch( err => res.status(503).json(err));
});

router.put('/todos', function( req, res) {
	let newTodo = req.body;

	Todo
		.findById(newTodo._id)
		.then( function(t) {
			t
			.updateOne({ $set: { 'title' : newTodo.title }})
			.then( r => res.status(204).json(r))
		})
});

router.put('/todos/complete-todo', function(req, res) {
	let todoId = req.body;
	Todo
		.findById(todoId)
		.then( function(t) {
			if(t.isCompleted) {
				t
					.updateOne({$set: {'isCompleted': false}})
					.then( r => res.status(204).json(r))
			}
			else{
				t
					.update({$set: {'isCompleted': true}})
					.then( r => res.status(204).json(r))
			}
		})
})

router.delete('/todos/todo/:todoId', function(req, res) {
	let todoId = req.params.todoId;
	Todo
		.findById(todoId)
		.then( function(t) {
			if(t) {
				t
				.remove()
                .then( r => res.status(202).json({ todo: 'deleted!'}))
			} else {
				res.status(403).json({ todo: 'not found'})
            }
		})
})

module.exports = router;