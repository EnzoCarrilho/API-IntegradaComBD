/*******************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL para o CRUD de produtoras de Filmes
 * Data: 03/11/2025
 * Autor: Enzo
 * Versão: 1.0
 ******************************************************************************************************************/
//Import do model da DAO do genero
const producerDAO = require('../../model/dao/produtora.js')

//Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

const listarProdutoras = async function() {
    
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        let resultProducers = await producerDAO.getSelectAllProducers()

        if(resultProducers){
            if(resultProducers.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.produtoras = resultProducers

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

const buscarProdutoraID = async function(id){
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validando a chegada do ID
        if(!isNaN(id) && id != '' && id > 0){
            let resultProdutora = await producerDAO.getSelectByIdProducer(Number(id))

            if(resultProdutora){

                if(resultProdutora.length > 0){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.produtora = resultProdutora

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

const inserirProdutora = async function(produtora, contentType){

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
         if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

        let validar = await validarDadosProdutora()
        if(!validar){
            
            let resultProducer = await producerDAO.setInsertProducer(produtora)

            //Adicionar Filme no retorno
            if(resultProducer){

                let lastId = await producerDAO.getSelectLastId()
                
                if(lastId){
                    produtora.id = lastId

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items = produtora
                }else{
                    MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                }            
                return MESSAGES.DEFAULT_HEADER //201
            }else{
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }
        }else{
            return validar
        }

    }else{
        return MESSAGES.ERROR_CONTENT_TYPE //415
    }
        
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const atualizarProdutora = async function(produtora, id, contentType){

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do tipo de conteúdo da requisição (Obrigatório ser um JSON)
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

                //Chama a função de validação de dados do Filme
                let validar = await validarDadosProdutora(produtora)
                if(!validar){

                    //Validação de ID válido, chama a função da controller que ferifica no BD se o ID existe e valida o
                    let validarID = await buscarProdutoraID(id)
                    if(validarID.status_code == 200){

                        //Adiciona o ID do Filme no JSON de Dados para ser encaminhado ao DAO
                        produtora.id = Number(id)
                        

                        //Chama a função para inserir um novo filme no BD 
                        let resultProducer = await producerDAO.setUpdateProducer(produtora)
                        

                        if(resultProducer){
                            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                            MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                            MESSAGES.DEFAULT_HEADER.items.produtora = produtora
                            
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





const validarDadosProdutora = async function(produtora){

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    //Validações de todas entradas de dados
    if(produtora.nome == '' || produtora.nome == undefined || produtora.nome == null || produtora.nome.length > 100){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Nome incorreto]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS //400
    
    }else if(produtora.ano_fundacao == undefined || produtora.ano_fundacao == null, produtora.ano_fundacao == '' || produtora.ano_fundacao.length > 10){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Ano de Fundação incorreta]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(produtora.logo_url == undefined || produtora.logo_url == '' ||  produtora.logo_url == null){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [url do logo incorreta]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else{
        return false
    }
}


module.exports = {
    listarProdutoras,
    buscarProdutoraID,
    inserirProdutora,
    atualizarProdutora
}