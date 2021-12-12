require('dotenv').config() // comando, busca extenção arquivo .Env (variabeis de conexão banco)
const express = require('express')
const app = express()
const mongoose = require('mongoose')


//mongoose.connect("mongodb://localhost/subscribers",{useNewUrlParser: true, useUnifiedTopology:true})// faço conexão manual com o banco.
mongoose.connect(process.env.DATABASE_STRING,{useNewUrlParser: true, useUnifiedTopology:true}) // falo conexão mongodb por .Env

const db = mongoose.connection
db.on('erros',(err)=> console.log(err)) // trato possivel erro conexão
db.once('open', ()=> console.log('Database Connected')) //abro conexão

//usando padrão json, para consumid Api utilizando função de midware
app.use(express.json())

const subscribersRouter = require('./routes/subscribers') // config. rotas
app.use('/subscribers', subscribersRouter)


app.listen(3000, ()=> console.log('Server Running!'))