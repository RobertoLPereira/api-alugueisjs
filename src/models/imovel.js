const sequelizeBd = require("../libs/conect");
module.exports = (sequelize, DataType) => {
    const Imovel = sequelizeBd.define("imovel",
    {idimovel:{type:DataType.INTEGER,primaryKey: true,autoIncrement: true},
descricao:{type:DataType.STRING},
endereco:{type:DataType.STRING},
idproprietario:{type:DataType.INTEGER},
status:{type:DataType.INTEGER},
 },{ freezeTableName: true,modelName: "imovel",timestamps: false,
}); return Imovel;
}