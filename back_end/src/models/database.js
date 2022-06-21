const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/config.json')[env];

//Conexão com o banco de dados mysql
const sequelize = new Sequelize(config.database, config.username, config.password, { // conexão com o banco de dados
  host: config.host,
  dialect: config.dialect,
  logging: false
})

//Testando conexão com o banco de dados
sequelize.authenticate()
  .then(() => {
    console.log('Database: conected!')
  })
  .catch((error) => {
    console.log('Database: connection fail: ', error)
  })

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
}
