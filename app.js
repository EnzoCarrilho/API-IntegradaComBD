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
const routes_faixaEtaria = require('./routes/routes_faixaEtaria.js')
const routes_cargo = require('./routes/routes_cargo.js')
const routes_produtora = require('./routes/routes_produtora.js')


app.use(routes_filme)
app.use(routes_genero)
app.use(routes_faixaEtaria)
app.use(routes_cargo)
app.use(routes_produtora)



app.listen(PORT, () => {
    console.log('API aguardando requisições...')
})
