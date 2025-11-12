/*****************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao relacionamento de filme e faixas-etaria
 * Data: 12/11/2025
 * Autor: Enzo
 * Versão: 1.0
 ****************************************************************************************************************/


//Import da dependência do Prisma que permite a execução de Script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Retorna todos os filmes e gêneros cadastrados no BD
const getSelectAllMoviesAgeGroups = async function(){
    try {

        let sql = `select * from tbl_filme_faixa_etaria order by filme_faixa_id desc;`

        let result = await prisma.$queryRawUnsafe(sql)
        
        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}