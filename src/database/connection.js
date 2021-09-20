const knex = require('knex')
const databaseconfig = require('./knexfile')

const databaseConnection = knex(databaseconfig)

module.exports = { databaseConnection }
