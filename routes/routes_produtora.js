/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelo controle das rotas de produtoras de Filmes
 * Data: 03/11/2025
 * Autor: Enzo
 * Versão: 1.0
 ***********************************************************************************************************/


//Import das dependencias da API
const express =    require('express')
const cors =       require('cors') 
const bodyParser = require('body-parser')

//Cria um objeto especialista no formato JSON para receber dados via POST e PUT
const bodyParserJSON = bodyParser.json()

const router = express.Router()

const controller_produtora = require('../controller/produtora/controller_produtora.js')

router.get('/v1/locadora/produtora', cors(), async (request, response) => {
    let produtora = await controller_produtora.listarProdutoras()
    response.status(produtora.status_code).json(produtora)
})

router.get('/v1/locadora/produtora/:id', cors(), async(request, response) => {
    //Obtendo o ID do Gênero
    let idProdutora = request.params.id

    let produtora = await controller_produtora.buscarProdutoraID(idProdutora)
    
    response.status(produtora.status_code).json(produtora)
})

router.post('/v1/locadora/produtora', cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body

    let contentType = request.headers['content-type']
    
    let produtora = await controller_produtora.inserirProdutora(dadosBody, contentType)
    
    response.status(produtora.status_code).json(produtora)
})

router.put('/v1/locadora/produtora/:id', cors(), bodyParserJSON, async(request, response) => {
    let idProdutora = request.params.id
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let produtora = await controller_produtora.atualizarProdutora(dadosBody, idProdutora, contentType)
    response.status(produtora.status_code).json(produtora)
})

router.delete('/v1/locadora/produtora/:id', cors(), async(request, response) => {
    let idProdutora = request.params.id
    
    let produtora = await controller_produtora.excluirProdutora(idProdutora)
    
    response.status(produtora.status_code).json(produtora)
})

module.exports = router