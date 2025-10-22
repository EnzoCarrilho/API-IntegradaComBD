/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao genero de filmes 
 * Data: 22/10/2025
 * Autor: Enzo
 * Versão: 1.0
 ***********************************************************************************************************/

//Import da dependência do Prisma que permite a execução de Script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Retorna todos os gêneros cadastrados no BD
const getSelectAllGenres = async function(){
    try {

        let sql = `select * from tbl_genero order by genero_id desc;`

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
const getSelectByIdGenres = async function(id){
    try {
        let sql = `select * from tbl_genero where genero_id = ${id};`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const getSelectLastId = async function(){
    try {
        //Script SQL que retorna apenas o último ID do BD
        let sql = `select genero_id from tbl_genero order by genero_id desc limit 1;`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return Number(result[0].genero_id)
        else
            return false
    } catch (error) {
        return false
    }
}

const setInsertGenero = async function(genero){
    try {

        let sql = `INSERT INTO tbl_genero(nome)values('${genero.nome}');`

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
    getSelectAllGenres,
    getSelectByIdGenres,
    getSelectLastId,
    setInsertGenero,
}