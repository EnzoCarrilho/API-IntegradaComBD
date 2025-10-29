/*******************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL para o CRUD de Gêneros de Filmes
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