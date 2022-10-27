const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/off.json');

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
    telefone: {
        type: Number
    },
    cpf: {
        type: String,
        unique: true,
        required: true
    },
    cnpj: {
        type: String,
        index: false,
        required: false
    },
    filiacaoUSP: {
        type: Boolean,
    },
    curso: {
        type: String,
    },
    campus:{
        type: String,
    },
    motivo: {
        type: String,
        required: true
    },
    plus:{
        type: Boolean,
        required: true
    },
    favoritos:[{
        type: mongoose.Types.ObjectId
    }],
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]

});

UserSchema.virtual('stores', {
    ref:'Store',
    localField: 'usuario',
    foreignField: '_id'
});

UserSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id:user.id.toString()}, config.secret)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

UserSchema.pre('save', async function(next){
    const user = this;

    if(user.isModified('senha')){
        user.senha = await bcryptjs.hash(user.senha, 8);
    }

    next();
});

const User = mongoose.model('Usuários', UserSchema);
module.exports = User;