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

const getSelectLastId = async function(){
    try {
        //Script SQL que retorna apenas o último ID do BD
        let sql = `select produtora_id from tbl_produtora order by produtora_id desc limit 1;`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return Number(result[0].produtora_id)
        else
            return false
    } catch (error) {
        return false
    }
}

const setInsertProducer = async function(produtora){

    try {

        if(produtora.descicao != undefined){

            let sql = `INSERT INTO tbl_produtora(nome, ano_fundaco, logo_url, descricao)
                            values('${produtora.nome}', '${produtora.ano_fundacao}', '${produtora.logo_url}', '${produtora.descricao}');`

            let result = await prisma.$executeRawUnsafe(sql)
            
            if(result)
                return result
            else
                return false

        }else{

            let sql = `INSERT INTO tbl_produtora(nome, ano_fundaco, logo_url, descricao)
                            values('${produtora.nome}', '${produtora.ano_fundacao}', '${produtora.logo_url}', ${null} );`

            let result = await prisma.$executeRawUnsafe(sql)
            
            if(result)
                return result
            else
                return false
        }

    } catch (error) {
        return false
    }
}

module.exports = {
    getSelectAllProducers,
    getSelectByIdProducer,
    getSelectLastId,
    setInsertProducer
}