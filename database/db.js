const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const connnectDb = async () => {
  const conn = await mongoose.connect(process.env.LocalMONGO, {
    useNewUrlParser: true,
  })

<<<<<<< HEAD

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const connnectDb = async()=> {
    const conn = await mongoose.connect(process.env.LocalMONGO, {
        // useNewUrlParser: true
    })

   console.log(`Connected and working  database on ${PORT}` )
=======
  console.log(`Connected and working  database on ${conn.connection.host}`)
>>>>>>> origin/genesis
}

module.exports = connnectDb
