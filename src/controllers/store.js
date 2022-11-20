const User = require('../schemas/user');
const Store = require('../schemas/store');
const Product = require('../schemas/product');
const { ObjectId } = require('mongodb');

const register = async (req, res, next) => {
    try {
        
        req.body.usuario = req.user;
        
        const ObjectID = require('mongodb').ObjectId;

        if (!await User.findOne({ _id: req.body.usuario })) return res.status(400).json({ message: 'Usuário não existente' });

        // verificando se o usuário já tem loja
        let user = await Store.find({ usuario: new ObjectID(req.body.usuario) });

        if (user.length > 0) return res.status(200).json({ message: 'O usuário já tem uma loja cadastrada' })

        await Store.create(req.body);

        res.status(200).json({ message: 'Loja cadastrada com sucesso' });

    } catch (err) {
        console.error(err);
        next();
    }
}

const getAll = async (req, res, next) => {
    try {
        
        const stores = await Store.aggregate([
            {
                $lookup: {
                    from: 'usuários',
                    localField: 'usuario',
                    foreignField: '_id',
                    as: 'usuario_nome'
                }
            },
            {
                $project: {
                    nome: 1,
                    usuario: {
                        $arrayElemAt: ["$usuario_nome.nome", 0]
                    },
                    descricao: 1,
                    localizacao: 1,
                    // lista_produtos: 1,
                    // itens_mais_vendidos: 1,
                    horario: 1
                }
            }
        ]).allowDiskUse(true);

        if (!stores) res.status(404).json({ message: 'Não há nenhuma loja cadastrada' });

        res.status(200).json(stores);

    } catch (err) {
        console.error(err);
        next();
    }
}

const getStore = async (req, res, next) => {
    try {

        const _id = req.params.id;

        const store = await Store.aggregate([
            {
                $match: {
                    _id: new ObjectId(`${_id}`)
                }
            },
            {
                $lookup: {
                    from: 'usuários',
                    localField: 'usuario',
                    foreignField: '_id',
                    as: 'usuario_nome'
                }
            },
            {
                $project: {
                    nome: 1,
                    usuario: {
                        $arrayElemAt: ["$usuario_nome.nome", 0]
                    },
                    usuario_id: '$usuario',
                    descricao: 1,
                    localizacao: 1,
                    lista_produtos: 1,
                    // itens_mais_vendidos: 1,
                    horario: 1,
                    pontuacao:1
                }
            }

        ]).allowDiskUse(true);

        if (!store) return res.status(404).json({ message: 'Loja não existente' });

        res.status(200).json(store);

    } catch (err) {
        console.error(err);
        next();
    }
}

const getStores = async(req, res, next) => {
    try{
        
        const category = req.query.categoria;
        let stores = []
        if(category == 'Tudo') stores = await Store.find({});
        else stores = await Store.find({categoria: category});

        if(!stores) return res.status(404).json({message: 'Nenhum produto encontrado'});

        return res.status(200).json(stores);

    }catch(err){
        console.error(err);
        next();
    }
}

const updateStore = async (req, res, next) => {
    try {

        const id_usuario = req.user._id;

        const store = await Store.findOne({ usuario: id_usuario });

        if (!store) return res.status(404).json({ message: 'Loja não existente' });

        await Store.updateOne(
            { usuario: id_usuario },
            { $set: req.body }
        )

        res.status(200).json({ message: 'Atualizado com sucesso' });


    } catch (err) {
        console.error(err);
        next();
    }
}

const favoriteStore = async(req, res, next)=>{
    try{
     
        const id = req.params.id;

        const store = await Store.findById({_id: id});

        if(!store) return res.status(400).send('Loja não encontrado');

        await User.updateOne(
            {email: req.user.email},
            {$push: {favoritos: store}});

        return res.status(200).json({message: 'Atualizado'});

    }catch(err){
        console.error(err);
        next();
    }
}

module.exports = {
    register,
    getAll,
    getStore,
    updateStore,
    favoriteStore,
    getStores
}