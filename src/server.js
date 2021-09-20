const express = require("express")
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

//const database = require("./database/databaseKnex")
const database = require("./database/databaseMySql")



app.use(bodyParser.urlencoded({extended: true}))



//Mostra todos as postagens
app.get("/postagens",async (req, res)=>{
    res.send(await database.mostrarPostagens())
})

//Salva nova postagem
app.post("/postagens",async (req, res)=>{
    const postagem = await database.salvarPostagem({
    email: req.body.email,
    comentario: req.body.comentario
    })
    //console.log(postagem)
    res.send(req.body)    
})



app.listen(3000)