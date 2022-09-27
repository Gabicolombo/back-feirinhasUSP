const express = require('express');
const controller = require('../controllers/store');

const routes = express.Router();

const baseUrl = '/store';

routes.post(`${baseUrl}/register`, controller.register);
routes.get(`${baseUrl}/:id`, controller.getStore);
routes.get(`${baseUrl}/`, controller.getAll);
routes.put(`${baseUrl}/:id`, controller.updateStore);

module.exports = routes;