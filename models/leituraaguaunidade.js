const sequelizeBd = require("../libs/conect");
module.exports = (sequelize, DataType) => {
    const Leituraaguaunidade = sequelizeBd.define("leituraaguaunidade",
    {idleituraaguaunidade:{type:DataType.INTEGER,primaryKey: true,autoIncrement: true},
idunidade:{type:DataType.INTEGER},
leituraanterior:{type:DataType.DOUBLE},
leituraatual:{type:DataType.DOUBLE},
codigomedidor:{type:DataType.INTEGER},
dataleitura:{type:DataType.DATE},
status:{type:DataType.INTEGER},
valor:{type:DataType.DOUBLE},
 },{ freezeTableName: true,modelName: "leituraaguaunidade",timestamps: false,
}); 
/*Leituraaguaunidade.associate = function(model) {
    Leituraaguaunidade.belongsTo(model.imovelunidade.model, {
    foreignKey: 'idunidade',
    as: 'unidade',
  });
  };*/
  return Leituraaguaunidade;
}