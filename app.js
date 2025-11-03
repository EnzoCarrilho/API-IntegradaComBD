/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições da API da locadora de Filmes 
 * Data: 07/10/2025
 * Autor: Enzo
 * Versão: 1.0
 ***********************************************************************************************************/

//Import das dependencias da API
const express =    require('express')
const cors =       require('cors') 
const bodyParser = require('body-parser')

//Cria um objeto especialista no formato JSON para receber dados via POST e PUT
const bodyParserJSON = bodyParser.json()


//Retorna a porta do sevidor atual ou colocamos uma porta local
const PORT = process.PORT || 8080

//Criando uma instância de uma classe do express
const app = express()

//Configuraçõs do cors
app.use((request, response, next)=>{
    response.header('Acces-Control-Allow-Origin', '*')
    response.header('Acces-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    
    app.use(cors())
    next() 
})

//Import das rotas
const routes_filme = require('./routes/routes_filme.js')
const routes_genero = require('./routes/routes_genero.js')
const controller_faixaEtaria = require('./controller/faixa-etaria/controller_faixa_etaria.js')
const controller_cargo = require('./controller/cargo/controller_cargo.js')


app.use(routes_filme)
app.use(routes_genero)






/********************************************************************* EndPoints DE FAIXA ETÁRIA ***************************************************/
app.get('/v1/locadora/faixa-etaria', cors(), async (request, response) => {
    //Chama a função para listar os generos do BD
    let faixaEtaria = await controller_faixaEtaria.listarFaixasEtaria()
    response.status(faixaEtaria.status_code).json(faixaEtaria)
})

app.get('/v1/locadora/faixa-etaria/:id', cors(), async(request, response) => {
    //Obtendo o ID do Gênero
    let idFaixaEtaria = request.params.id

    let faixaEtaria = await controller_faixaEtaria.buscarFaixaEtariaID(idFaixaEtaria)
    
    response.status(faixaEtaria.status_code).json(faixaEtaria)
})

app.post('/v1/locadora/faixa-etaria', cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let faixaEtaria = await controller_faixaEtaria.inserirFaixaEtaria(dadosBody, contentType)
    response.status(faixaEtaria.status_code).json(faixaEtaria)
})

app.put('/v1/locadora/faixa-etaria/:id', cors(), bodyParserJSON, async(request, response) => {
    let idFaixaEtaria = request.params.id
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let faixaEtaria = await controller_faixaEtaria.atualizarFaixaEtaria(dadosBody, idFaixaEtaria, contentType)
    response.status(faixaEtaria.status_code).json(faixaEtaria)
})

app.delete('/v1/locadora/faixa-etaria/:id', cors(), async(request, response) => {
    let idFaixaEtaria = request.params.id
    
    let faixaEtaria = await controller_faixaEtaria.excluirFaixaEtaria(idFaixaEtaria)
    
    response.status(faixaEtaria.status_code).json(faixaEtaria)
})



/********************************************************************* EndPoints DE CARGOS ***************************************************/
app.get('/v1/locadora/cargo', cors(), async (request, response) => {
    let cargo = await controller_cargo.listarCargos()
    response.status(cargo.status_code).json(cargo)
})

app.get('/v1/locadora/cargo/:id', cors(), async(request, response) => {
    //Obtendo o ID do Gênero
    let idCargo = request.params.id

    let cargo = await controller_cargo.buscarCargoID(idCargo)
    
    response.status(cargo.status_code).json(cargo)
})

app.post('/v1/locadora/cargo', cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let cargo = await controller_cargo.inserirCargo(dadosBody, contentType)
    response.status(cargo.status_code).json(cargo)
})




app.listen(PORT, () => {
    console.log('API aguardando requisições...')
})
