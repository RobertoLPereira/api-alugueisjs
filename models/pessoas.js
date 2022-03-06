const sequelizeBd = require("../libs/conect");
module.exports = (sequelize, DataType) => {
    const Pessoas = sequelizeBd.define("pessoas",
    {idpessoa:{type:DataType.INTEGER,primaryKey: true,autoIncrement: true},
nome:{type:DataType.STRING},
telefone:{type:DataType.STRING},
proprietario:{type:DataType.BOOLEAN},
cadastradoem:{type:DataType.DATE},
status:{type:DataType.INTEGER},
url_avatar:{type:DataType.STRING},
email:{type:DataType.STRING},
 },{ freezeTableName: true,modelName: "pessoas",timestamps: false,
}); return Pessoas;
}