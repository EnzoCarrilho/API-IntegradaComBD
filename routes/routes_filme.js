/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelo controle das rotas Filme da API 
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

const controller_filme = require('../controller/filme/controller_filme.js')


//Retorna a lista de todos os filmes
router.get('/v1/locadora/filme', cors(), async (request, response) => {
    //Chama a função para listar os filmes do BD
    let filme = await controller_filme.listarFilmes()
    console.log(filme.status_code)
    response.status(filme.status_code).json(filme)
})

//Retorna um filme filtrando pelo ID
router.get('/v1/locadora/filme/:id', cors(), async (request, response) => {
    
    //Recebe o ID encaminhado via parâmetro na requisição
    let idFilme = request.params.id

    //Chama a função para buscar o filme do BD filtrando pelo ID
    let filme = await controller_filme.buscarFilmeId(idFilme)
    //console.log(filme)
    response.status(filme.status_code).json(filme)
})

//Insere um novo Filme
router.post('/v1/locadora/filme', cors(), bodyParserJSON, async (request, response) => {

    //Recebe os dados do body da rtequisição (Se você utilizar o bodyParser é sobrigatório ter no EndPoint)
    let dadosBody = request.body

    //Recebe o tipo de dados da requisição (JSON ou XML ou ...)
    let contentType = request.headers['content-type']

    //Chama a função da controller para inserir o novo filme, encaminha os dados e o content-type
    let filme = await controller_filme.inserirFilme(dadosBody, contentType)
    response.status(filme.status_code).json(filme)

})

//Atualiza um filme existente
router.put('/v1/locadora/filme/:id', cors(), bodyParserJSON, async(request, response) => {
    //Recebe o ID do Filme
    let idFilme = request.params.id
    
    //Recebe os dados a serem atualizados
    let dadosBody = request.body
    
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    let filme = await controller_filme.atualizarFilme(dadosBody, idFilme, contentType)
    response.status(filme.status_code).json(filme)
})

// Deleta um Filme pelo ID
router.delete('/v1/locadora/filme/:id', cors(), async(request, response) => {
    let idFilme = request.params.id

    let filme = await controller_filme.excluirFilme(idFilme)
    response.status(filme.status_code).json(filme)
})

module.exports = router
