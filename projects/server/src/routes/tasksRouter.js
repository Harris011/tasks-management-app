const route = require('express').Router();
const { get, create, edit, deleteTask, update, notification } = require('../controllers/tasksController');

route.get('/tasks', get);
route.post('/create', create);
route.patch('/edit/:id', edit);
route.patch('/delete/:id', deleteTask);
route.patch('/update/:id', update);
route.get('/notification', notification);

module.exports = route