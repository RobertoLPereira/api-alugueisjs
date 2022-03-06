const sequelizeBd = require("../libs/conect");
module.exports = (sequelize, DataType) => {
    const Contrato = sequelizeBd.define("contrato",
    {idcontrato:{type:DataType.INTEGER,primaryKey: true,autoIncrement: true},
idunidadeimovel:{type:DataType.INTEGER},
idlocador:{type:DataType.INTEGER},
idlocatario:{type:DataType.INTEGER},
diavencimento:{type:DataType.INTEGER},
datacontrato:{type:DataType.DATE},
status:{type:DataType.INTEGER},
validadecontrato:{type:DataType.DATE},
valor:{type:DataType.DOUBLE},
 },{ freezeTableName: true,modelName: "contrato",timestamps: false,
}); return Contrato;
}