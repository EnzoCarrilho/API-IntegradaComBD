/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente a CARGOS dentro de uma Produtora de filmes 
 * Data: 29/10/2025
 * Autor: Enzo
 * Versão: 1.0
 ***********************************************************************************************************/

//Import da dependência do Prisma que permite a execução de Script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Retorna todos os gêneros cadastrados no BD
const getSelectAllRoles = async function(){
    try {

        let sql = `select * from tbl_cargo order by cargo_id desc;`

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
    getSelectAllRoles
}