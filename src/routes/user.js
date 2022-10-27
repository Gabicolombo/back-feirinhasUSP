const express = require('express');
const controller = require('../controllers/user');

const routes = express.Router();

const baseUrl = '/user';

routes.post(`${baseUrl}/register`, controller.register);
routes.post(`${baseUrl}/`, controller.login);

module.exports = routes;
