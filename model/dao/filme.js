/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao filme 
 * Data: 01/10/2025
 * Autor: Enzo
 * Versão: 1.0
 ***********************************************************************************************************/
/* 
   Exemplos de dependências para conexão com BD
    Bancos de Dados Relacionais
        Sequelize -> Foi utilizado em muitos projetos desde o início do node
        Prisma -> é uma dependência atual que trabalha com o BD (SQL, PosthreSQL, SQL Server ou ORM)
                                            Comandos Usados
            npm install prisma --save                -> Instalar o prisma (Conexão com o Database)
            npm install prisma @prisma/client --save -> Instalar o cliente do prisma (Executar scripts SQL no BD)
            npx prisma init                          -> Prompt de comando para inicializar o prisma
            npx prisma migrate dev                   -> Realiza o sincronismo entreo prisma e o BD (CUIDADO, nesse processo você pode perder dados reais do BD, 
                                                                                                    pois ele pega e cria as tabelas programadas na ORM schema.prisma)
            npx prisma generate                      -> Apenas realiza o sincronismo entreo peisma e o BD, geralmente usamos para rodar o projeto em um PC novo

        Knex -> é uma dependêncial atual que trabalha com MYSQL
    Banco de Dados Não Relacional
        Mongoose -> É uma dependência para o Mongo DB (Não relacional)
*/

/******************************************************* MÉTODOS PRISMA **********************************************************
$queryRawUnsafe()   - Permite executar um script SQL de uma variável e que retorna valores do banco (SELECT)
$executeRawUnsafe() - Permite executar um script SQL de uma variável e que NÃO retorna dados do banco (INSERT, UPDATE, DELETE)
$queryRaw()         - Permite executar um script SQL sem estar em uma variável e que retorna valores 
                      do banco (SELECT) e faz tratamentos de segurança contra SQL Inject
$executeRaw()       - Permite executar um script SQL sem estar em uma variável e que NÃO retorna dados 
                      do banco (INSERT, UPDATE, DELETE) e faz tratamentos de segurança contra SQL Inject    
**********************************************************************************************************************************/

//Import da dependência do Prisma que permite a execução de Script SQL no BD
const { PrismaClient } = require('@prisma/client')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Retorna uma lista de todos os filmes do Banco de Dados
const getSelectAllMovies = async function(){
    try {
        //Script SQL
        let sql = `select * from tbl_filme order by id desc`

        //Encaminha para o BD o Script SQL
        let result = await prisma.$queryRawUnsafe(sql)
        
        if(result.length > 0)
            return result
        else
            return false
    } catch (error) {
        return false
    }
    
}

//Retorna um filme filtrando pelo ID do Banco de Dados
const getSelectByIdMovies = async function(id){

}

//Insere um filme novo no Banco de Dados
const setInsertMovie = async function(){

}

//Altera um filme no Banco de Dados
const setUpdateMovies = async function(id){

}

//Exclui um filme pelo ID no Banco de Dados
const setDeleteMovies = async function(id){

}

module.exports = {
    getSelectAllMovies,
}


