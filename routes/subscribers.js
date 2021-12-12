const express = require('express')
const subscriber = require('../models/subscriber')
const router = express.Router()
const Subscriber = require('../models/subscriber')// import subscriber que é meu modelo de dados

// rota para buscar registros
router.get('/', async (req, res)=>{
    //res.send('REST API ok!')-- teste
    // importo rota raiz do subscriber do meu modelo de dados
    try {
        const subscribers = await Subscriber.find() // await- faço requisição assincrona Async.
        res.json(subscribers) // devolve no formato Json
    } catch (error) {
        res.status(500).json({message: error.message}) // devolvo erro status 500   
    }
})

// rota para buscar registros por ID
router.get('/:id', getSubscriber, (req, res)=>{
    res.json(res.subscriber)
})


//rota para salvar registros
router.post('/', async (req, res)=>{
    // retorno dados do model Subscriver.js
    const subscriber = new Subscriber({   //objeto que chama nosso model
        userName: req.body.userName,
        userChannel: req.body.userChannel
    }) 

    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch (error) {
       
        
    }
})

//rota  para alterar registros
router.patch('/:id', getSubscriber, async (req, res)=>{
    if(req.body.userName != null){
        res.subscriber.userName = req.body.userName
    }  
    if(req.body.userChannel != null){
        res.subscriber.userChannel = req.body.userChannel
    }  
    try {
        const updateSubscriber = await res.subscriber.save()
        res.json(updateSubscriber)
    } catch (error) {
        res.status(400).json({message: error.message})
        
    }
})

//rota para apagar registros
router.delete('/:id', getSubscriber, async (req, res)=>{
    try {
        await res.subscriber.remove()
        res.json({message: 'Subscriber was deleted !'})
    } catch (error) {
       res.status(500).json({message: error.message})   
    }
})

// funcão de midware que valido retorno de Parametro ID exist
async function getSubscriber(req, res, next) {// next - executa em pilha
 try {
     subscriberId = await Subscriber.findById(req.params.id)
     if(subscriberId == null){
         return res.status(404).json({message: 'subscriber not found !'})
     }
    } catch (error) {
        res.status(500).json({message: error.message}) // devolvo erro status 500   
    }

    res.subscriber = subscriberId
    next()
}  

module.exports = router