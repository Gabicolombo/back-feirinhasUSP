const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

// rotas
const routerUser = require('../src/routes/user');
const routerStore = require('../src/routes/store');
const routerProduct = require('../src/routes/product');

// conectando
const app = express();
const port = process.env.port || 2828;

const db = require('./database/mongoConnection');
app.use(cors());
app.use(express.json());
app.use(bodyparser.json());
// configurando as rotas utilizadas
app.use(routerUser);
app.use(routerStore);
app.use(routerProduct);

// conectando com o mongodb
db();

// abrindo a porta
app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})