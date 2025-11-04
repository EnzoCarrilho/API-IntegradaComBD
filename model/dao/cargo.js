/*****************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente a cargos da equipe de filmagem de filmes 
 * Data: 29/10/2025
 * Autor: Enzo
 * Versão: 1.0
 *****************************************************************************************************************/

//Import da dependência do Prisma que permite a execução de Script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

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

const getSelectByIdRole = async function(id){
    try {
        let sql = `select * from tbl_cargo where cargo_id = ${id};`

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
        let sql = `select cargo_id from tbl_cargo order by cargo_id desc limit 1;`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return Number(result[0].cargo_id)
        else
            return false
    } catch (error) {
        return false
    }
}

const setInsertRole = async function(cargo){

    try {

        if(cargo.descicao != undefined || cargo.descicao != null || cargo.descicao != ''){

            let sql = `INSERT INTO tbl_cargo(nome, descricao)values('${cargo.nome}', '${cargo.descricao}');`

            let result = await prisma.$executeRawUnsafe(sql)
            
            if(result)
                return result
            else
                return false

        }else{

            let sql = `INSERT INTO tbl_cargo(nome, descricao)values('${cargo.nome}', ${null});`

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

const setUpdateRole = async function(cargo){

    try {

        if(cargo.descicao != undefined){

            let sql = `UPDATE tbl_cargo SET nome = '${cargo.nome}', 
                        descricao' = '${cargo.descricao}' WHERE cargo_id = ${cargo.id};`

            let result = await prisma.$executeRawUnsafe(sql)
            
            if(result)
                return result
            else
                return false

        }else{

            let sql = `UPDATE tbl_cargo SET nome = '${cargo.nome}' WHERE cargo_id = ${cargo.id}` 

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

const setDeleteRole = async function(id){
    try {
        
        let sql = `delete from tbl_cargo where cargo_id = ${id}`

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
    getSelectAllRoles,
    getSelectByIdRole,
    getSelectLastId,
    setInsertRole,
    setUpdateRole,
    setDeleteRole
}