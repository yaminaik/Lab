module.exports = app => {
    const todo = require('../controllers/todo.controller.js');
    var router = require('express').Router();

    // Create a new ToDo
    router.post('/', todo.create);

    // Retrieve all ToDos
    router.get('/', todo.findAll);
    router.get("/:id",todo.findOne);
    // Update a ToDo by id
    router.put('/:id', todo.update);

    // Delete a ToDo by id
    router.delete('/:id', todo.delete);

    // Delete all ToDos
    router.delete('/', todo.deleteAll);

    app.use('/api/todo', router);  // Ensure the correct base route is set
};
