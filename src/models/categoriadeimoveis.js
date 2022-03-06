const sequelizeBd = require("../libs/conect");
module.exports = (sequelize, DataType) => {
    const Categoriadeimoveis = sequelizeBd.define("categoriadeimoveis",
    {
    idcategoriadeimoveis:{type:DataType.INTEGER,primaryKey: true,autoIncrement: true},
    denominacao:{type:DataType.STRING},
 },{ freezeTableName: true,modelName: "categoriadeimoveis",timestamps: false,
}); return Categoriadeimoveis;
}