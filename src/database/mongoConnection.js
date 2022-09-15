const mongoose = require('mongoose');

module.exports = async() => {
    try{
        const url = "mongodb://localhost/FeirinhasUsp";
        await mongoose.connect(url);
        console.log('Connected to database');
    }catch(err){
        console.error(err.message());
    }
}