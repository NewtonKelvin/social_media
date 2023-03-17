const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../../config/config.json")[env];

//Conexão com o banco de dados mysql
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    // conexão com o banco de dados
    host: config.host,
    dialect: config.dialect,
    logging: false,
  }
);

//Testando conexão com o banco de dados
sequelize
  .authenticate()
  .then(() => {
    console.log("\u001b[1;32m Database: conected! \u001b[0m");
  })
  .catch((error) => {
    console.log("\u001b[1;31m Database: connection fail: ", error, "\u001b[0m");
  });

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize,
};
