/*******************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL para o CRUD de Gêneros de Filmes
 * Data: 22/10/2025
 * Autor: Enzo
 * Versão: 1.0
 ******************************************************************************************************************/
//Import do model da DAO do genero
const generoDAO = require('../../model/dao/genero.js')

//Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

const listarGeneros = async function() {
    
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        let resultGeneros = await generoDAO.getSelectAllGenres() 

        if(resultGeneros){
            if(resultGeneros.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.filmes = resultGeneros

                return MESSAGES.DEFAULT_HEADER //200
            }else{
                return MESSAGES.ERROR_NOT_FOUND//404
            }

        }else{
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

const buscarGeneroID = async function(id){
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validando a chegada do ID
        if(!isNaN(id) && id != '' && id > 0){
            let resultGenero = await generoDAO.getSelectByIdGenres(Number(id))

            if(resultGenero){

                if(resultGenero.length > 0){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.genero = resultGenero

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

const inserirGenero = async function(genero, contentType){

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

        //Validação da entrada de dados
        if(genero.nome == '' || genero.nome == undefined || genero.nome == null || genero.nome.length > 100){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Nome de Gênero Inválido]' 

            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }else{

            let resultGeneros = await generoDAO.setInsertGenre(genero)

            //Adicionar Filme no retorno
            if(resultGeneros){

                let lastId = await generoDAO.getSelectLastId()
                
                if(lastId){
                    genero.id = lastId

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items = genero
                }else{
                    MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                }            
                return MESSAGES.DEFAULT_HEADER //201
            }else{
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }
        }

    }else{
        return MESSAGES.ERROR_CONTENT_TYPE //415
    }

}

const atualizarGenero = async function (genero, id, contentType){
    
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

        //Validação da entrada de dados
        if(genero.nome == '' || genero.nome == undefined || genero.nome == null || genero.nome.length > 100){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Nome de Gênero Inválido]' 

            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }else{
            let validarID = await buscarGeneroID(id)

            if(validarID.status_code == 200){
                genero.id = Number(id)

                let resultGeneros = await generoDAO.setUpdateGenres(genero)

                if(resultGeneros){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items.genero = genero
                    
                    return MESSAGES.DEFAULT_HEADER //201
                }else{
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                }
            }else{
                return validarID
            }
        }
    }else{
        return MESSAGES.ERROR_CONTENT_TYPE
    }        

}



module.exports = {
    listarGeneros,
    buscarGeneroID,
    inserirGenero,
    atualizarGenero,
}