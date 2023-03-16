

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const connnectDb = async()=> {
    const conn = await mongoose.connect(process.env.LocalMONGO, {
        // useNewUrlParser: true
    })

   console.log(`Connected and working  database on ${PORT}` )
}


module.exports = connnectDb;