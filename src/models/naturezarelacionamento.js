const sequelizeBd = require("../libs/conect");
module.exports = (sequelize, DataType) => {
    const Naturezarelacionamento = sequelizeBd.define("naturezarelacionamento",
    {id:{type:DataType.INTEGER,primaryKey: true,autoIncrement: true},
denominacao:{type:DataType.STRING},
 },{ freezeTableName: true,modelName: "naturezarelacionamento",timestamps: false,
}); return Naturezarelacionamento;
}