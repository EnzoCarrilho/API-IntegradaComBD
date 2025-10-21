/***********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL para o CRUD de Filmes 
 * Data: 07/10/2025
 * Autor: Enzo
 * Versão: 1.0
 ***********************************************************************************************************/
//Import do model da DAO do filme
const e = require('express')
const filmeDAO = require('../../model/dao/filme.js')

//Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

//Retorna um lista de todos os Filmes
const listarFilmes = async function(){
    
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try{ 
        //Chama a função do DAO para retornar a lista de filmes do BD
        let resultFilmes = await filmeDAO.getSelectAllMovies()

        if(resultFilmes){
            if(resultFilmes.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.filmes = resultFilmes

                return MESSAGES.DEFAULT_HEADER //200
            }else{
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        }else{
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }

    }catch(error){
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Retorna um Filme filtrando pelo ID
const buscarFilmeId = async function(id){
    
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    
    try {
        //Validação da chegada do ID
        if(!isNaN(id) && id != '' && id > 0){
            let resultFilmes = await filmeDAO.getSelectByIdMovies(Number(id))

            if(resultFilmes){
                if(resultFilmes.length > 0){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filme = resultFilmes

                    return MESSAGES.DEFAULT_HEADER //200
                    
                }else{
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            }else{
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        }else{
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID Incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Insere um filme 
const inserirFilme = async function(filme, contentType){
    
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do tipo de conteúdo da requisição (Obrigatório ser um JSON)
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            //Chama a função de validação de dados do Filme
            let validar = await validarDadosFilme(filme)
            if(!validar){    
                //Processamento
                //Chama a função para inserir um novo filme no BD 
                let resultFilmes = await filmeDAO.setInsertMovie(filme)

                if(resultFilmes){
                    //Chama a função para receber o ID gerado no BD
                    let lastId = await filmeDAO.getSelectLastId()
                    if(lastId){
                        // Adiciona o ID no JSON com os dados do Filme
                        filme.id = lastId

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = filme
                        
                        return MESSAGES.DEFAULT_HEADER //201
                    }else{
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                }else{
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }else{
                return validar //400
            }
        }else{
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
    
}

//Atualiza um Filme buscando pelo ID
const atualizarFilme = async function(filme, id, contentType){

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do tipo de conteúdo da requisição (Obrigatório ser um JSON)
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

                //Chama a função de validação de dados do Filme
                let validar = await validarDadosFilme(filme)
                if(!validar){

                    //Validação de ID válido, chama a função da controller que ferifica no BD se o ID existe e valida o
                    let validarID = await buscarFilmeId(id)
                    if(validarID.status_code == 200){

                        //Adiciona o ID do Filme no JSON de Dados para ser encaminhado ao DAO
                        filme.id = Number(id)
                        

                        //Chama a função para inserir um novo filme no BD 
                        let resultFilmes = await filmeDAO.setUpdateMovies(filme)
                        

                        if(resultFilmes){
                            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                            MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                            MESSAGES.DEFAULT_HEADER.items.filme = filme
                            
                            return MESSAGES.DEFAULT_HEADER //201
                        }else{
                            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                        }
                    }else{
                        return validarID //A função buscarFilmeId poderá retornar (400 | 404 | 500) 
                    }
                }else{
                    return validar //400 Referente a validação dos dados 
                }
            
        }else{
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Exclui um Filme buscando pelo ID
const excluirFilme = async function(id){

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        let validarId = await buscarFilmeId(id)
        
        if(validarId.status_code == 200){
            
            let resultFilmes = await filmeDAO.setDeleteMovies(Number(id))

            if(resultFilmes){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message
                delete MESSAGES.DEFAULT_HEADER.items
                
                return MESSAGES.DEFAULT_HEADER //200
            }else{
                return MESSAGES.ERROR_NOT_FOUND //404
            }

        }else{
            return validarId
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Validação dos dados de cadastro e atualização do filme
const validarDadosFilme = async function(filme){

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    //Validações de todas entradas de dados
    if(filme.nome == '' || filme.nome == undefined || filme.nome == null || filme.nome.length > 100){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Nome incorreto]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS //400
    
    }else if(filme.sinopse == undefined){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Sinopse incorreta]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(filme.data_lancamento == undefined || filme.data_lancamento.length != 10){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Data de Lançamento incorreta]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(filme.duracao == '' || filme.duracao == undefined || filme.duracao == null || filme.duracao.length > 8){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Duração incorreta]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(filme.orcamento == '' || filme.orcamento == undefined || filme.orcamento == null || filme.orcamento.length > 12 || typeof(filme.orcamento) != 'number'){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Orçamento incorreto]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(filme.trailer == undefined || filme.trailer > 200){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Trailer incorreto]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(filme.capa == '' || filme.capa == undefined || filme.capa == null || filme.capa.length > 200){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Capa incorreta]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else{
        return false
    }
}

module.exports = {
    listarFilmes,
    buscarFilmeId,
    inserirFilme,
    atualizarFilme,
    excluirFilme
}