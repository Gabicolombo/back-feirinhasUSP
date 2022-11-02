const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
    nome: {
        type: String,
        index: false,
        required: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'Usuario'
    },
    descricao: {
        type: String,
        required: true
    },
    localizacao: {
        type: String,
        required: true
    },
    lista_produtos: [{
        type: mongoose.Schema.Types.Object,
        ref: 'Produtos'
    }],
    horario:{
        type: String
    },
    categoria:{
        type: String,
        required: true
    },
    itens_mais_vendidos: [{
        type: mongoose.Schema.Types.String,
        ref: 'Produtos'
    }],
    pontuacao: {
        type: Number,
    },
    foto: {
        type: String
    }
});

StoreSchema.pre('save', async function(next){
    const store = this
    next()
});

const Store = mongoose.model('Lojas', StoreSchema);
module.exports = Store;