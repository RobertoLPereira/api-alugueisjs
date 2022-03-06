const sequelizeBd = require("../libs/conect");
module.exports = (sequelize, DataType) => {
    const Centrocusto = sequelizeBd.define("centrocusto",
    {id:{type:DataType.INTEGER,primaryKey: true,autoIncrement: true},
idtaxaadm:{type:DataType.INTEGER},
idpagamento:{type:DataType.INTEGER},
valor:{type:DataType.DOUBLE},
 },{ freezeTableName: true,modelName: "centrocusto",timestamps: false,
}); return Centrocusto;
}