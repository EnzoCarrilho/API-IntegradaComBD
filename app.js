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

//Import das controllers
const controller_filme = require('./controller/filme/controller_filme.js')

//EndPoints para a rota de Filme
app.get('/v1/locadora/filme', cors(), async (request, response) => {
    //Chama a função para listar os filmes do BD
    let filme = await controller_filme.listarFilmes()
    response.status(filme.status_code).json(filme)
})

app.get('/v1/locadora/filme/:id', cors(), async (request, response) => {
    
    //Recebe o ID encaminhado via parâmetro na requisição
    let idFilme = request.params.id

    //Chama a função para buscar o filme do BD filtrando pelo ID
    let filme = await controller_filme.buscarFilmeId(idFilme)
    //console.log(filme)
    response.status(filme.status_code).json(filme)
})


app.listen(PORT, () => {
    console.log('API aguardando requisições...')
})