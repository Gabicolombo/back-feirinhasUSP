const express = require('express');
const controller = require('../controllers/store');
const auth = require('../middleware/auth');

const routes = express.Router();

const baseUrl = '/store';

routes.post(`${baseUrl}/register`, auth, controller.register);
routes.post(`${baseUrl}/favorite/:id`, auth, controller.favoriteStore);
routes.get(`${baseUrl}/:id`, controller.getStore);
routes.get(`${baseUrl}/`, auth, controller.getAll);
routes.put(`${baseUrl}/`, auth, controller.updateStore);

module.exports = routes;