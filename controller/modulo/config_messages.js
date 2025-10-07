/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelos padrões de mensagem que o projeto iá realizar, sempre no 
 *                                              formato JSON (Mensagens de erro e Sucesso, etc) 
 * Data: 07/10/2025
 * Autor: Enzo
 * Versão: 1.0
 ***********************************************************************************************************/
const dataAtual = new Date()


/***************************************************MENSAGENS PADRONIZADAS*******************************************/
const MESSAGE_HEADER = {  
    development: 'Enzo Felix Carrilho', 
    api_description: 'API para manipular dados de Filmes',
    status: Boolean,
    status_code: Number,
    request_date: dataAtual.getTimezoneOffset(),
    items: {}
}

/***************************************************MENSAGENS DE SUCESSO********************************************/
const MESSAGE_REQUEST_SUCCESS = {
    status: true,
    status_code: 200,
    message: 'Requisição bem sucedida!!!'
}


/***************************************************MENSAGENS DE ERRO**********************************************/



module.exports = {
    MESSAGE_HEADER,
    MESSAGE_REQUEST_SUCCESS
}