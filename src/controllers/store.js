const User = require('../schemas/user');
const Store = require('../schemas/store');
const Product = require('../schemas/product');

const register = async (req, res, next) => {
    try{
        console.log(req.body);
        const {usuario} = req.body;

        if(!await User.findOne({_id: usuario})) return res.status(400).json({message: 'Usuário não existente'});

        await Store.create(req.body);

        res.status(200).json({message: 'Loja cadastrada com sucesso'});

    }catch(err){
        console.error(err);
        next();
    }
}

const getAll = async(req, res, next) => {
    try{

        const stores = await Store.find();

        if(!stores) res.status(404).json({message: 'Não há nenhuma loja cadastrada'});

        res.status(200).json({data: stores});

    }catch(err){
        console.error(err);
        next();
    }
}

const getStore = async(req, res, next) => {
    try{

        const nome = req.params.id;
       
        const store = await Store.findOne({nome: nome});

        if(!store) return res.status(404).json({message: 'Loja não existente'});

        res.status(200).json({data: store});

    }catch(err){
        console.error(err);
        next();
    }
}

const updateStore = async(req, res, next) => {
    try{

        const nome = req.params.id;

        await Store.updateOne(
            {nome: nome}, 
            {$set: req.body}
        )

        res.status(200).json({message: 'Atualizado com sucesso'});


    }catch(err){
        console.error(err);
        next();
    }
}

module.exports = {
    register,
    getAll,
    getStore,
    updateStore
}