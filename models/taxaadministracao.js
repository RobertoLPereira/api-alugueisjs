const sequelizeBd = require("../libs/conect");
module.exports = (sequelize, DataType) => {
    const Taxaadministracao = sequelizeBd.define("taxaadministracao",
    {id:{type:DataType.INTEGER,primaryKey: true,autoIncrement: true},
idfavorecido:{type:DataType.INTEGER},
taxa:{type:DataType.DOUBLE},
valor:{type:DataType.DOUBLE},
idcontrato:{type:DataType.INTEGER},
situacao:{type:DataType.INTEGER},
 },{ freezeTableName: true,modelName: "taxaadministracao",timestamps: false,
}); return Taxaadministracao;
}