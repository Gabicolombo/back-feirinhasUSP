const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        unique: true
    },
    descricao: {
        type: String, 
        required: true
    },
    foto:{
        type: String,
        required: true
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
    }
});

ProductSchema.virtual('stores', {
    ref:'Store',
    localField: 'lista_produtos',
    foreignField: '_id'
})

ProductSchema.pre('save', async function(next){
    const product = this;

    next();
});

const Product = mongoose.model('Produtos', ProductSchema);
module.exports = Product;

