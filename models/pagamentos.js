const sequelizeBd = require("../libs/conect");
module.exports = (sequelize, DataType) => {
    const Pagamentos = sequelizeBd.define("pagamentos",
    {idpagamento:{type:DataType.INTEGER,primaryKey: true,autoIncrement: true},
datapagamento:{type:DataType.DATE},
valorpago:{type:DataType.DOUBLE},
juros:{type:DataType.DOUBLE},
desconto:{type:DataType.DOUBLE},
idcontrato:{type:DataType.INTEGER},
 },{ freezeTableName: true,modelName: "pagamentos",timestamps: false,
}); return Pagamentos;
}