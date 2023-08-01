const route = require('express').Router();
const { get, create, edit, deleteBoard } = require('../controllers/boardsControler');

route.get('/boards', get);
route.post('/create', create);
route.patch('/edit/:id', edit);
route.patch('/delete/:id', deleteBoard);

module.exports = route