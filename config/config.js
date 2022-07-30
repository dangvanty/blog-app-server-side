require("dotenv").config();
const Sequelize = require("sequelize");

// Create MySQL database connection object using Sequelize
let sequelize;
let dbName=process.env.DB_NAME
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    "blogapp",
    "root",
    "",
    {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
    }
  );
}

module.exports = sequelize;
