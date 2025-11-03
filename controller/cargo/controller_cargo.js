/*******************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL para o CRUD de cargos da equipe de Filmes
 * Data: 29/10/2025
 * Autor: Enzo
 * Versão: 1.0
 ******************************************************************************************************************/
//Import do model da DAO do genero
const cargoDAO = require('../../model/dao/cargo.js')

//Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

const listarCargos = async function() {
    
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        let resultCargos = await cargoDAO.getSelectAllRoles() 

        if(resultCargos){
            if(resultCargos.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.cargos = resultCargos

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


const buscarCargoID = async function(id){
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validando a chegada do ID
        if(!isNaN(id) && id != '' && id > 0){
            let resultCargo = await cargoDAO.getSelectByIdRole(Number(id))

            if(resultCargo){

                if(resultCargo.length > 0){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.cargo = resultCargo

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

const inserirCargo = async function(cargo, contentType){

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

        //Validação da entrada de dados
        if(cargo.nome == '' || cargo.nome == undefined || cargo.nome == null || cargo.nome.length > 100){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Nome de Gênero Inválido]' 

            return MESSAGES.ERROR_REQUIRED_FIELDS //400

        }else{

            let resultCargo = await cargoDAO.setInsertRole(cargo)

            //Adicionar Filme no retorno
            if(resultCargo){

                let lastId = await cargoDAO.getSelectLastId()
                
                if(lastId){
                    cargo.id = lastId

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items = cargo
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

const atualizarCargo = async function(cargo, id, contentType){

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

        //Validação da entrada de dados
        if(cargo.nome == '' || cargo.nome == undefined || cargo.nome == null || cargo.nome.length > 100){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Nome de Gênero Inválido]' 

            return MESSAGES.ERROR_REQUIRED_FIELDS //400

        }else{

            let validarID = await buscarCargoID(id)

            if(validarID.status_code == 200){
                cargo.id = Number(id)

                let resultCargo = await cargoDAO.setInsertRole(cargo)

                if(resultCargo){

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items.cargo = cargo
                         
                    return MESSAGES.DEFAULT_HEADER //201
                }else{
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                }
            }else{
                return validarID
            }
        }

    }else{
        return MESSAGES.ERROR_CONTENT_TYPE //415
    }

}

const excluirCargo = async function(id){

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    
    try {
            
        let validarId = await buscarCargoID(id)
            
        if(validarId.status_code == 200){
                
            let resultCargo = await cargoDAO.setDeleteRole(Number(id))
            
    
            if(resultCargo){
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



module.exports = {
    listarCargos,
    buscarCargoID,
    inserirCargo,
    atualizarCargo,
    excluirCargo
}