const sequelizeBd = require("../libs/conect");
module.exports = (sequelize, DataType) => {
    const Imovelunidade = sequelizeBd.define("imovelunidade",
    {idunidade:{type:DataType.INTEGER,primaryKey: true,autoIncrement: true},
idimovel:{type:DataType.INTEGER},
idlocatario:{type:DataType.INTEGER},
descricao:{type:DataType.STRING},
status:{type:DataType.INTEGER},
 },{ freezeTableName: true,modelName: "imovelunidade",timestamps: false,
}); return Imovelunidade;
}