const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    nomeProduto: {
        type: String,
        required: true,
    },
    descricao: {
        type: String, 
        required: true
    },
    foto:{
        type: String, 
    },
    quantidade: {
        type: Number,
        required: true
    },
    preco: {
        type: Number,
        required: true
    },
    status:{
        type: Boolean,
    },
    categoria:{
        type: String,
        required: true
    },
    usuario: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    
});

ProductSchema.virtual('stores', {
    ref:'Store',
    localField: 'lista_produtos',
    foreignField: 'nome'
})

ProductSchema.pre('save', async function(next){
    const product = this;

    next();
});

const Product = mongoose.model('Produtos', ProductSchema);
module.exports = Product;

