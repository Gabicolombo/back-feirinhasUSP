const mongoose = require('mongoose');

module.exports = async() => {
    try{
        // const url = "mongodb://localhost/FeirinhasUsp";
        const url = "mongodb+srv://feirinha:feirinha-usp@feirinha-usp-rp2.uherujz.mongodb.net/test"
        await mongoose.connect(url);
        console.log('Connected to database');
    }catch(err){
        console.error(err.message);
    }
}