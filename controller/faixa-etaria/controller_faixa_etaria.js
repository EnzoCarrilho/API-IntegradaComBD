/*******************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL para o CRUD de Faixas Etária de Filmes
 * Data: 29/10/2025
 * Autor: Enzo
 * Versão: 1.0
 ******************************************************************************************************************/
//Import do model da DAO do genero
const faixaEtariaDAO = require('../../model/dao/faixa_etaria.js')

//Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

const listarFaixasEtaria = async function() {
    
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        let resultFaixaEtaria = await faixaEtariaDAO.getSelectAllAgeGroups()

        if(resultFaixaEtaria){
            if(resultFaixaEtaria.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.faixas_etaria = resultFaixaEtaria

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

const buscarFaixaEtariaID = async function(id){
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validando a chegada do ID
        if(!isNaN(id) && id != '' && id > 0){
            let resultFaixaEtaria = await faixaEtariaDAO.getSelectByIdAgeGroup(Number(id))

            if(resultFaixaEtaria){

                if(resultFaixaEtaria.length > 0){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.faixa_etaria = resultFaixaEtaria

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

const inserirFaixaEtaria = async function(faixaEtaria, contentType){

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

        //Validação da entrada de dados
        if(faixaEtaria.classificacao == '' || faixaEtaria.classificacao == undefined || faixaEtaria.classificacao == null || faixaEtaria.classificacao.length > 2){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Classificação de Faixa-Etária Inválida]' 

            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }else{

            let resultFaixaEtaria = await faixaEtariaDAO.setInsertAgeGroup(faixaEtaria)

            //Adicionar Filme no retorno
            if(resultFaixaEtaria){

                let lastId = await faixaEtariaDAO.getSelectLastId()
                
                if(lastId){
                    faixaEtaria.id = lastId

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items = faixaEtaria
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

const atualizarFaixaEtaria = async function (faixaEtaria, id, contentType){
    
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

        //Validação da entrada de dados
        if(faixaEtaria.classificacao == '' || faixaEtaria.classificacao == undefined || faixaEtaria.classificacao == null || faixaEtaria.classificacao.length > 2){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Classificação de Faixa Etária Inválida]' 

            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }else{
            let validarID = await buscarFaixaEtariaID(id)

            if(validarID.status_code == 200){
                faixaEtaria.id = Number(id)

                let resultFaixaEtaria = await faixaEtariaDAO.setUpdateAgeGroup(faixaEtaria)

                if(resultFaixaEtaria){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items.faixa_etaria = faixaEtaria
                    
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
    listarFaixasEtaria,
    buscarFaixaEtariaID,
    inserirFaixaEtaria,
    atualizarFaixaEtaria
}