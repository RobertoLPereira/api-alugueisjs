const sequelizeBd = require("../libs/conect");
module.exports = (sequelize, DataType) => {
    const Faixadeconsumo = sequelizeBd.define("faixadeconsumo",
    {idfaixadeconsumo:{type:DataType.INTEGER,primaryKey: true,autoIncrement: true},
denominacao:{type:DataType.STRING},
faixainicial:{type:DataType.INTEGER},
faixafinal:{type:DataType.INTEGER},
tarifaagua:{type:DataType.DOUBLE},
tarifaesgoto:{type:DataType.DOUBLE},
tfdi:{type:DataType.DOUBLE},
idimovel:{type:DataType.INTEGER},
 },{ freezeTableName: true,modelName: "faixadeconsumo",timestamps: false,
}); return Faixadeconsumo;
}