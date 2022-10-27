const express = require('express');
const controller = require('../controllers/product');
const auth = require('../middleware/auth');

const routes = express.Router();

const baseUrl = '/product';

routes.get(`${baseUrl}/`, controller.getProducts);
routes.post(`${baseUrl}/register`, auth, controller.registerProduct);
routes.put(`${baseUrl}/:id`, auth, controller.updateProduct);
routes.delete(`${baseUrl}/:id`, auth, controller.deleteProduct);

// routes.put(`${baseUrl}/`, auth, controller.updateStore);

module.exports = routes;