/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelo controle das rotas de faixas Etaria de Filme
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

const controller_faixaEtaria = require('./controller/faixa-etaria/controller_faixa_etaria.js')

router.get('/v1/locadora/faixa-etaria', cors(), async (request, response) => {
    //Chama a função para listar os generos do BD
    let faixaEtaria = await controller_faixaEtaria.listarFaixasEtaria()
    response.status(faixaEtaria.status_code).json(faixaEtaria)
})

router.get('/v1/locadora/faixa-etaria/:id', cors(), async(request, response) => {
    //Obtendo o ID do Gênero
    let idFaixaEtaria = request.params.id

    let faixaEtaria = await controller_faixaEtaria.buscarFaixaEtariaID(idFaixaEtaria)
    
    response.status(faixaEtaria.status_code).json(faixaEtaria)
})

router.post('/v1/locadora/faixa-etaria', cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let faixaEtaria = await controller_faixaEtaria.inserirFaixaEtaria(dadosBody, contentType)
    response.status(faixaEtaria.status_code).json(faixaEtaria)
})

router.put('/v1/locadora/faixa-etaria/:id', cors(), bodyParserJSON, async(request, response) => {
    let idFaixaEtaria = request.params.id
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let faixaEtaria = await controller_faixaEtaria.atualizarFaixaEtaria(dadosBody, idFaixaEtaria, contentType)
    response.status(faixaEtaria.status_code).json(faixaEtaria)
})

router.delete('/v1/locadora/faixa-etaria/:id', cors(), async(request, response) => {
    let idFaixaEtaria = request.params.id
    
    let faixaEtaria = await controller_faixaEtaria.excluirFaixaEtaria(idFaixaEtaria)
    
    response.status(faixaEtaria.status_code).json(faixaEtaria)
})

module.exports = router