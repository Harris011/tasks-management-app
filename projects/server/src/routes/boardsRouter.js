const route = require('express').Router();
const { create } = require('../controllers/boardsControler');

route.post('/create', create);

module.exports = route