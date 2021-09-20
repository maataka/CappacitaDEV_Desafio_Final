require('dotenv').config()



console.log(process.env.NODE_ENV)
console.log(process.env.API_KEY)

console.log(process.env.NODE_ENV + process.env.API_KEY)

const API_KEY = process.env.API_KEY
const teste = `url_${API_KEY}`

console.log(teste)