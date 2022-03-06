const Sequelize = require("sequelize");

const path = require("path");
const fs = require("fs");
const sequelizeBd = require("./libs/conect.js");
let db = null;
module.exports = app => {
  if(!db) {
    const config = app.libs.config;    
    const sequelize = new Sequelize(
     config.database,
      config.username,
      config.password,
      config.params);

    db = {
      sequelize,
      Sequelize,
      models: {}
    };
    
    const dir = path.join(__dirname, 'models');
    fs.readdirSync(dir).forEach(filename => {
      const modelDir = path.join(dir, filename);
      const model = sequelize.import(modelDir);
      db.models[model.name] = model;
    });

  Object.keys(db).forEach((models) => {
  if (db[models].associate) {
    db[models].associate(db);
  }
});

db.sequelize = sequelizeBd;
db.Sequelize = Sequelize;
  
  }

  return db;
};