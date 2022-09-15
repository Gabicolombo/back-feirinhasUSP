const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    senha: {
        type: String,
        trim: true,
        select: false,
        required: true
    },
    cpf: {
        type: String,
        unique: true,
        required: true
    },
    sexo: {
        type: String,
        required: true
    },
    curso: {
        type: String,
        required: true
    },
    campus:{
        type: String,
        required: true
    }
});

UserSchema.pre('save', async function(next){
    const user = this;

    if(user.isModified('senha')){
        user.senha = await bcryptjs.hash(user.senha, 8);
    }

    next();
});

const User = mongoose.model('Usuários', UserSchema);
module.exports = User;