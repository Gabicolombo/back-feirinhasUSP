const Product = require('../schemas/product');
const Store = require('../schemas/store');
const { ObjectId } = require('mongodb');

const registerProduct = async(req, res, next) => {
    try{

        const { _id } = req.user._id;
        const {nomeProduto} = req.body;

        let productList = await Store.aggregate([
            {
                $match: {usuario: _id}
            },
            {
                $lookup:{
                    from: 'produtos',
                    localField: 'lista_produtos',
                    foreignField: 'nomeProduto',
                    as: 'produtos'
                }
            },
            {
                $project: {
                    produtos: 1,
                    _id: 0
                }
            }
        ]).allowDiskUse(true);

        productList[0].produtos.forEach(e => {
            if(e.nomeProduto === nomeProduto) return res.status(400).json({message: 'Esse produto já existe na loja'});
        })
        req.body.usuario = req.user.nome;
        await Product.create(req.body);
        
        await Store.updateOne(
            { usuario: _id },
            { $push: {lista_produtos: req.body}}
        )

        res.status(200).json({ message: 'Produto registrado com sucesso' });
        

    }catch(err){
        console.error(err);
        next();
    }
}

// atualizar produto
const updateProduct = async(req, res, next) => {
    try{

        const idProduct = req.params.id;
        
        const nome_usuario = req.user.nome;

        const product = await Product.findOneAndUpdate(
            { usuario: nome_usuario, _id: new ObjectId(idProduct) }, 
            { $set: req.body});

        if (!product) return res.status(404).json({ message: 'Produto não existente' });

        return res.status(200).json({message: 'Produto atualizado com sucesso'});

    }catch(err){
        console.error(err);
        next();
    }
}

// deletar produto
const deleteProduct = async(req, res, next) => {
    try{

        const id = req.params.id;

        const nome_usuario = req.user.nome;

        const product = await Product.findOneAndDelete(
            { usuario: nome_usuario, _id: new ObjectId(id) }, 
            { $set: req.body});

        if (!product) return res.status(404).json({ message: 'Produto não existente' });

        return res.status(200).json({message: 'Produto deletado com sucesso'});

    }catch(err){
        console.error(err);
        next();
    }
}

// pegar o produto de acordo com os filtros, fazer paginação
const getProducts = async(req, res, next) => {
    try{

        const products = await Product.find({});

        if(!products) return res.status(404).json({message: 'Nenhum produto encontrado'});

        return res.status(200).json(products);

    }catch(err){
        console.error(err);
        next();
    }
}

module.exports = {
    registerProduct,
    updateProduct,
    deleteProduct,
    getProducts
}