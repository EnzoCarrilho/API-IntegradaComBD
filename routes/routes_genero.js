/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelo controle das rotas de Gêmero de Filme da API 
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

const controller_genero = require('./controller/filme/controller_genero')

router.get('/v1/locadora/genero', cors(), async (request, response) => {
    //Chama a função para listar os generos do BD
    let genero = await controller_genero.listarGeneros()
    response.status(genero.status_code).json(genero)
})

router.get('/v1/locadora/genero/:id', cors(), async(request, response) => {
    //Obtendo o ID do Gênero
    let idGenero = request.params.id

    let genero = await controller_genero.buscarGeneroID(idGenero)
    
    response.status(genero.status_code).json(genero)
})

router.post('/v1/locadora/genero', cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let genero = await controller_genero.inserirGenero(dadosBody, contentType)
    response.status(genero.status_code).json(genero)
})

router.put('/v1/locadora/genero/:id', cors(), bodyParserJSON, async(request, response) => {
    let idGenero = request.params.id
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let genero = await controller_genero.atualizarGenero(dadosBody, idGenero, contentType)
    response.status(genero.status_code).json(genero)
})

router.delete('/v1/locadora/genero/:id', cors(), async(request, response) => {
    let idGenero = request.params.id
    
    let genero = await controller_genero.excluirGenero(idGenero)
    
    response.status(genero.status_code).json(genero)
})

module.exports = router