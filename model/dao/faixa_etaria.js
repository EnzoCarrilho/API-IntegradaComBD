/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente a faixa-etária de filmes 
 * Data: 29/10/2025
 * Autor: Enzo
 * Versão: 1.0
 ***********************************************************************************************************/

//Import da dependência do Prisma que permite a execução de Script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Retorna todos os gêneros cadastrados no BD
const getSelectAllAgeGroups = async function(){
    try {

        let sql = `select * from tbl_faixa_etaria order by faixa_etaria_id desc;`

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
const getSelectByIdAgeGroup = async function(id){
    try {
        let sql = `select * from tbl_faixa_etaria where faixa_etaria_id = ${id};`

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
        let sql = `select faixa_etaria_id from tbl_faixa_etaria order by faixa_etaria_id desc limit 1;`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return Number(result[0].faixa_etaria_id)
        else
            return false
    } catch (error) {
        return false
    }
}

const setInsertAgeGroup = async function(faixaEtaria){
    try {

        let sql = `INSERT INTO tbl_faixa_etaria(classificacao)values('${faixaEtaria.classificacao}');`

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
    getSelectAllAgeGroups,
    getSelectByIdAgeGroup,
    getSelectLastId,
    setInsertAgeGroup
}