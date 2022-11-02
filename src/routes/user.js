const express = require('express');
const controller = require('../controllers/user');
const auth = require('../middleware/auth');

const routes = express.Router();

const baseUrl = '/user';

routes.post(`${baseUrl}/register`, controller.register);
routes.post(`${baseUrl}/`, controller.login);
routes.get(`${baseUrl}/favorites`, auth, controller.getFavorites);

module.exports = routes;
