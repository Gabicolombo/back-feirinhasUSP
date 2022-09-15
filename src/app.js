const express = require('express');
const bodyparser = require('body-parser');

// rotas
const routerUser = require('../src/routes/user');

// conectando
const app = express();
const port = process.env.port || 2828;

const db = require('./database/mongoConnection');
app.use(express.json());
app.use(bodyparser.json());
// configurando as rotas utilizadas
app.use(routerUser);

// conectando com o mongodb
db();

// abrindo a porta
app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})