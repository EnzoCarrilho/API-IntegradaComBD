/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelo controle das rotas de cargos da equipe de Filmagem
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

const controller_cargo = require('./controller/cargo/controller_cargo.js')

router.get('/v1/locadora/cargo', cors(), async (request, response) => {
    let cargo = await controller_cargo.listarCargos()
    response.status(cargo.status_code).json(cargo)
})

router.get('/v1/locadora/cargo/:id', cors(), async(request, response) => {
    //Obtendo o ID do Gênero
    let idCargo = request.params.id

    let cargo = await controller_cargo.buscarCargoID(idCargo)
    
    response.status(cargo.status_code).json(cargo)
})

router.post('/v1/locadora/cargo', cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let cargo = await controller_cargo.inserirCargo(dadosBody, contentType)
    response.status(cargo.status_code).json(cargo)
})

router.put('/v1/locadora/cargo/:id', cors(), bodyParserJSON, async(request, response) => {
    let idCargo = request.params.id
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let cargo = await controller_cargo.atualizarGenero(dadosBody, idCargo, contentType)
    response.status(cargo.status_code).json(cargo)
})

module.exports = router