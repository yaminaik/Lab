const db = require("../models")
const todo = db.todo;

exports.create = (req, res) => {
    console.log('create method called'); 
    if (!req.body.title) {
        res.status(400).send({ message: "Content cannot be empty" });
        return;
    }

    // Instance of the ToDo model
    const todoInstance = new db.todo({
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed ? req.body.completed : false
    });

    // Save ToDo instance
    todoInstance
        .save(todoInstance)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the ToDo"
            });
        });
};

//Retrive all the Tutorials from database
// Retrieve all ToDos from the database
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    todo.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving ToDos"
            });
        });
};
exports.findOne = (req, res) =>{
    const id = req.params.id;
    todo.findById(id)
        .then(data => {
            if(!data)
                res.status(404).send({message:"Not found Todo with id " +id });
            else res.send(data);
        })
    .catch(err =>{
        res.status(500).send({
            message: 
            err.message || "Some error occurred while retrieving todo with id= " +id
        });
    });
    
    };

// Update a ToDo by id
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update cannot be empty"
        });
    }
    const id = req.params.id;

    todo.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Cannot update ToDo with id " + id });
            } else {
                res.send({ message: "ToDo updated successfully" });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while updating ToDo with id= " + id
            });
        });
};

// Delete a ToDo by id
exports.delete = (req, res) => {
    const id = req.params.id;

    todo.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Cannot delete ToDo with id " + id });
            } else {
                res.send({ message: "ToDo deleted successfully" });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while deleting ToDo with id= " + id
            });
        });
};

// Delete all ToDos from the database
exports.deleteAll = (req, res) => {
    todo.deleteMany({})
        .then(data => {
            res.send({ message: `${data.deletedCount} ToDos were deleted successfully` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while deleting ToDos"
            });
        });
};
