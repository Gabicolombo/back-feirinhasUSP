const express = require('express');
const controller = require('../controllers/product');
const auth = require('../middleware/auth');

const routes = express.Router();

const baseUrl = '/product';

routes.post(`${baseUrl}/register`, auth, controller.registerProduct);
routes.get(`${baseUrl}/`, auth, controller.getProducts);
routes.get(`${baseUrl}/:id`, auth, controller.getProduct);
routes.put(`${baseUrl}/:id`, auth, controller.updateProduct);
routes.delete(`${baseUrl}/:id`, auth, controller.deleteProduct);

// routes.put(`${baseUrl}/`, auth, controller.updateStore);

module.exports = routes;