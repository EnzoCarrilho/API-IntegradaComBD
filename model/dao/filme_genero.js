/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao relacionamento de filme e gêneros
 * Data: 05/10/2025
 * Autor: Enzo
 * Versão: 1.0
 ***********************************************************************************************************/


//Import da dependência do Prisma que permite a execução de Script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Retorna todos os filmes e gêneros cadastrados no BD
const getSelectAllMoviesGenres = async function(){
    try {

        let sql = `select * from tbl_filme_genero order by filme_genero_id desc;`

        let result = await prisma.$queryRawUnsafe(sql)
        
        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Retorna um Gênero Filtrando pelo ID
const getSelectByIdMoviesGenres = async function(id){
    try {
        let sql = `select * from tbl_filme_genero where id = ${id};`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const getSelectByMovieIdMoviesGenres = async function(id){
    try {
        let sql = `select * from tbl_filme_genero where filme_id = ${id};`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Retorna uma lista de Gêneros filtrando pelo ID do filme
const getSelectGenresByIdMovies = async function(idFilme){
    try {
        let sql = `select tbl_genero.genero_id, tbl_genero.nome
                        from tbl_filme
                            inner join tbl_filme_genero
                                on tbl_filme.id = tbl_filme_genero.filme_id
                            inner join tbl_genero 
                                on tbl_genero.genero_id = tbl_filme_genero.genero_id 
                        where tbl_filme.id = ${idFilme};`

        let result = await prisma.$queryRawUnsafe(sql)
        
        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Retorna uma lista de Filmes filtando pelo gênero
const getSelectMoviesByIdGenre = async function(idGenero){
    try {
        let sql = `select tbl_filme.id, tbl_filme.nome
                        from tbl_filme
                            inner join tbl_filme_genero
                                on tbl_filme.id = tbl_filme_genero.filme.id
                            inner join tbl_genero 
                                on tbl_genero.genero_id = tbl_filme_genero.genero_id 
                        where tbl_genero.id = ${idGenero};`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Retorna o último ID do Gênero Cadastrado
const getSelectLastId = async function(){
    try {
        //Script SQL que retorna apenas o último ID do BD
        let sql = `select id from tbl_filme_genero order by id desc limit 1;`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return Number(result[0].id)
        else
            return false
    } catch (error) {
        return false
    }
}

const setInsertMoviesGenre = async function(filmeGenero){
    try {

        let sql = `INSERT INTO tbl_filme_genero (filme_id, genero_id)
                    values( ${filmeGenero.filme_id}, ${filmeGenero.genero_id} );`

        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return result
        else
            return false

    } catch (error) {
        
        return false
    }
}

const setUpdateMoviesGenres = async function(filmeGenero){
    try {
        let sql = `UPDATE tbl_filme_genero SET 
                    filme_id = ${filmeGenero.filme_id} 
                    genero_id = ${filmeGenero.genero_id} 
                    WHERE id = ${filmeGenero.id};`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
        
}

const setDeleteMoviesGenresByMovieID = async function(id){
    try {
        
        let sql = `delete from tbl_filme_genero where filme_id = ${id};`

        let result = await prisma.$executeRawUnsafe(sql)
        

        if(result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    getSelectAllMoviesGenres,
    getSelectByIdMoviesGenres,
    getSelectGenresByIdMovies,
    getSelectMoviesByIdGenre,
    getSelectLastId,
    setInsertMoviesGenre,
    setUpdateMoviesGenres,
    setDeleteMoviesGenresByMovieID,
    getSelectByMovieIdMoviesGenres
}
