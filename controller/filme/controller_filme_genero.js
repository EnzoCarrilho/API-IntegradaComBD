/*****************************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL para o CRUD na relação entre Filme e Gênero
 * Data: 05/11/2025
 * Autor: Enzo
 * Versão: 1.0
 *****************************************************************************************************************************/
//Import do model da DAO do genero
const filmeGeneroDAO = require('../../model/dao/filme_genero.js')


//Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

const listarFilmesGeneros = async function() {
    
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        let resultFilmesGeneros = await filmeGeneroDAO.getSelectAllMoviesGenres() 

        if(resultFilmesGeneros){
            if(resultFilmesGeneros.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.filmes_generos = resultFilmesGeneros

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

const buscarFilmeGeneroID = async function(id){
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validando a chegada do ID
        if(!isNaN(id) && id != '' && id > 0){
            let resultFilmeGenero = await filmeGeneroDAO.getSelectByIdMoviesGenres(Number(id))

            if(resultFilmeGenero){

                if(resultFilmeGenero.length > 0){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filme_genero = resultFilmeGenero

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

const buscarFilmeGeneroIDFilme = async function(idFilme){
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validando a chegada do ID
        if(!isNaN(idFilme) && idFilme != '' && idFilme > 0){
            let resultFilmeGenero = await filmeGeneroDAO.getSelectByMovieIdMoviesGenres(Number(idFilme))

            if(resultFilmeGenero){

                if(resultFilmeGenero.length > 0){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filme_genero = resultFilmeGenero

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

//Retorna Generos Filtrando pelo Filme
const listarGenerosIdFilme = async function(idFilme){
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    
    try {
        //Validando a chegada do ID
        if(!isNaN(idFilme) && idFilme != '' && idFilme > 0){
            let resultFilmeGenero = await filmeGeneroDAO.getSelectGenresByIdMovies(Number(idFilme))
            

            if(resultFilmeGenero){

                if(resultFilmeGenero.length > 0){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filme_genero = resultFilmeGenero

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

//Retorna Filme Filtrando pelo Gênero
const listarFilmesIdGenero = async function(idGenero){
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validando a chegada do ID
        if(!isNaN(idGenero) && idGenero != '' && idGenero > 0){
            let resultFilmeGenero = await filmeGeneroDAO.getSelectMoviesByIdGenre(Number(idGenero))

            if(resultFilmeGenero){

                if(resultFilmeGenero.length > 0){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filme_genero = resultFilmeGenero

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


const inserirFilmeGenero = async function(filmeGenero, contentType){

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){


        let validar = await validarDadosFilmeGenero(filmeGenero)
       

        //Validação da entrada de dados
        if(!validar){

            let resultFilmesGeneros = await filmeGeneroDAO.setInsertMoviesGenre(filmeGenero)
            
            //Adicionar Filme no retorno
            if(resultFilmesGeneros){

                let lastId = await filmeGeneroDAO.getSelectLastId()
                
                if(lastId){
                    filmeGenero.id = lastId

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items = filmeGenero

                    return MESSAGES.DEFAULT_HEADER

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

}

const atualizarFilmeGenero = async function (filmeGenero, id, contentType){
    
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

        let validar = validarDadosFilmeGenero(filmeGenero)

        //Validação da entrada de dados
        if(!validar){

            let validarID = await buscarFilmeGeneroID(id)

            if(validarID.status_code == 200){

                filmeGenero.id = Number(id)

                let resultFilmesGeneros = await filmeGeneroDAO.setUpdateMoviesGenres(filmeGenero)

                //Adicionar Filme no retorno
                if(resultFilmesGeneros){

                    let lastId = await filmeGeneroDAO.getSelectLastId()
                    
                    if(lastId){
                        
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.filme_genero = filmeGenero

                        return MESSAGES.DEFAULT_HEADER
                    }else{
                        MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                    }            
                    return MESSAGES.DEFAULT_HEADER //201
                }else{
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                }
            }else{
                return validarID
            }
           
        }else{
            return validar
            
        }

    }else{
        return MESSAGES.ERROR_CONTENT_TYPE //415
    }      

}

const excluirFilmeGenero = async function(id){

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    
    try {
            
        let validarId = await buscarFilmeGeneroID(id)
            
        if(validarId.status_code == 200){
                
            let resultFilmesGeneros = await filmeGeneroDAO.setDeleteMoviesGenres(Number(id))
            
    
            if(resultFilmesGeneros){
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

const excluirFilmeGeneroIdFilme = async function(idFilme){

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    
    try {
            
        let validarId = await buscarFilmeGeneroIDFilme(idFilme)
            
        if(validarId.status_code == 200){
                
            let resultFilmesGeneros = await filmeGeneroDAO.setDeleteMoviesGenresByMovieID(Number(idFilme))
            
    
            if(resultFilmesGeneros){
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

const validarDadosFilmeGenero = async function(filmeGenero) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if(filmeGenero.filme_id <= 0 || isNaN(filmeGenero.filme_id) || filmeGenero.filme_id == '' || filmeGenero.filme_id == undefined || filmeGenero.filme_id == null){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [filme_id Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(filmeGenero.genero_id <= 0 || isNaN(filmeGenero.genero_id) || filmeGenero.genero_id == '' || filmeGenero.genero_id == undefined || filmeGenero.genero_id == null){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [genero_id Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else{
        return false
    }   
}



module.exports = {
    listarFilmesGeneros,
    buscarFilmeGeneroID,
    listarGenerosIdFilme,
    listarFilmesIdGenero,
    inserirFilmeGenero,
    atualizarFilmeGenero,
    excluirFilmeGenero,
    excluirFilmeGeneroIdFilme
}