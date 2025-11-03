/*****************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente a produtoras de filmes 
 * Data: 03/11/2025
 * Autor: Enzo
 * Versão: 1.0
 *****************************************************************************************************************/

//Import da dependência do Prisma que permite a execução de Script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

const getSelectAllProducers = async function(){
    try {

        let sql = `select * from tbl_produtora order by produtora_id desc;`

        let result = await prisma.$queryRawUnsafe(sql)
        
        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const getSelectByIdProducer = async function(id){
    try {
        let sql = `select * from tbl_produtora where cargo_id = ${id};`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    getSelectAllProducers,
    getSelectByIdProducer
}