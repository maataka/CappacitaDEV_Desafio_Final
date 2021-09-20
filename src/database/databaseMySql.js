const { databaseConnection } = require('./connection')

async function salvarPostagem(postagem) {
  //  console.log(postagem)



    const queryInsertPostagem = `INSERT INTO postagens(email, comentario) VALUES ('${postagem.email}','${postagem.comentario}')`
    console.log(queryInsertPostagem)

    const result = await databaseConnection.raw(queryInsertPostagem)

    console.log(result)

    if(result){
        return {
            email: postagem.email,
            comentario: postagem.comentario,
            id: result[0].insertId
        }

        }else {
            console.error('Deu erro!')
            return {
                error: 'Deu erro na inserção!'
            }
    }
}

async function mostrarPostagens() {
    const querySelectPostagens = `SELECT * FROM postagens`
    const result = await databaseConnection.raw(querySelectPostagens)

    return result[0]
}


module.exports = {salvarPostagem, mostrarPostagens}
