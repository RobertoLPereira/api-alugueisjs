const sequelizeBd = require("../libs/conect");
module.exports = (sequelize, DataType) => {
    const Contact = sequelizeBd.define("contact",
    {id:{type:DataType.INTEGER,primaryKey: true,autoIncrement: true},
nome:{type:DataType.STRING},
telefone:{type:DataType.STRING},
email:{type:DataType.STRING},
url_avatar:{type:DataType.STRING},
proprietario:{type:DataType.BOOLEAN},
cadastradoem:{type:DataType.DATE},
status:{type:DataType.INTEGER},
 },{ freezeTableName: true,modelName: "contact",timestamps: false,
}); return Contact;
}