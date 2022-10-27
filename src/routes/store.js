const express = require('express');
const controller = require('../controllers/store');
const auth = require('../middleware/auth');

const routes = express.Router();

const baseUrl = '/store';

routes.post(`${baseUrl}/register`, auth, controller.register);
routes.get(`${baseUrl}/:id`, auth, controller.getStore);
routes.get(`${baseUrl}/`, auth, controller.getAll);
routes.put(`${baseUrl}/`, auth, controller.updateStore);

module.exports = routes;