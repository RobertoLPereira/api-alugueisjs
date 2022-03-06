const sequelizeBd = require("../libs/conect");
module.exports = (sequelize, DataType) => {
    const Vinculos = sequelizeBd.define("vinculos",
    {idvinculo:{type:DataType.INTEGER,primaryKey: true,autoIncrement: true},
idnaturezarelac:{type:DataType.INTEGER},
idpessoa:{type:DataType.INTEGER},
inicio:{type:DataType.DATE},
fim:{type:DataType.DATE},
idimovel:{type:DataType.INTEGER},
 },{ freezeTableName: true,modelName: "vinculos",timestamps: false,
}); return Vinculos;
}