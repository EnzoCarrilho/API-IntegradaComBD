/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelos padrões de mensagem que o projeto iá realizar, sempre no 
 *                                              formato JSON (Mensagens de erro e Sucesso, etc) 
 * Data: 07/10/2025
 * Autor: Enzo
 * Versão: 1.0
 ***********************************************************************************************************/
const dataAtual = new Date()


/***************************************************MENSAGENS PADRONIZADAS*******************************************/
const DEFAULT_HEADER = {  
    development: 'Enzo Felix Carrilho', 
    api_description: 'API para manipular dados de Filmes',
    status: Boolean,
    status_code: Number,
    request_date: dataAtual.toLocaleString(), // ou toLocaleString
    items: {}
}

/***************************************************MENSAGENS DE SUCESSO********************************************/
const SUCCESS_REQUEST = {
    status: true,
    status_code: 200,
    message: 'Requisição bem sucedida!!!'
}


/***************************************************MENSAGENS DE ERRO**********************************************/



module.exports = {
    DEFAULT_HEADER,
    SUCCESS_REQUEST
}