/***********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL para o CRUD de Filmes 
 * Data: 07/10/2025
 * Autor: Enzo
 * Versão: 1.0
 ***********************************************************************************************************/
//Import do model da DAO do filme
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
        if(!isNaN(id)){
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
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Insere um filme 
const inserirFilme = async function(filme){

}

//Atualiza um Filme buscando pelo ID
const atualizarFilme = async function(filme, id){

}

//Exclui um Filme buscando pelo ID
const excluirFilme = async function(id){

}

module.exports = {
    listarFilmes,
    buscarFilmeId,
}