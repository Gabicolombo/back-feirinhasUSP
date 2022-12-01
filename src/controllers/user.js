const User = require('../schemas/user');
const bcryptjs = require('bcryptjs');
const auth = require('../middleware/auth');

async function comparePassword(input, password){
    return await bcryptjs.compare(input, password);
}

const login = async(req, res, next) => {
    try{

        const {email, senha} = req.body;

        const user = await User.findOne({email: email}).select('+senha');

        if(!user) return res.status(404).json({message: 'Usuário não encontrado'});

        result = await comparePassword(senha, user.senha);

        if(!result) return res.status(400).json({message: 'Senha incorreta'});

        const token = await user.generateAuthToken();
      

        res.status(200).json({user, token});

    }catch(err){
        console.error(err);
        next()
    }
}

const register = async(req, res, next) => {
    try{

        const {email, cpf} = req.body;

        if(await User.findOne({email: email}) || await User.findOne({cpf: cpf}) ) return res.status(200).json({message: 'Esse usuário já está cadastrado'});

        await User.create(req.body);

        res.status(200).json({message: 'Usuário cadastrado com sucesso'});

    }catch(err){
        console.error(err);
        next();
    }
}

const getFavorites = async(req, res, next) => {
    try{
        //await User.find({email: req.user.email});
        
        const products = await User.aggregate([
            {
                $match: {email: req.user.email}
            },
            {
                $project:{
                    favoritos: 1,
                }
            }
        ]).allowDiskUse(true);

        if(products.length === 0) return res.status(404).json({message: 'Não há nenhum produto favorito'});
        
        return res.status(200).json(products[0].favoritos);
        

    }catch(err){
        console.error(err);
        next();
    }
}

module.exports = {
    register,
    login,
    getFavorites
}