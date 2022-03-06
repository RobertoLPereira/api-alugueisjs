const sequelizeBd = require("../libs/conect");
module.exports = (sequelize, DataType) => {
    const Status = sequelizeBd.define("status",
    {idstatus:{type:DataType.INTEGER,primaryKey: true,autoIncrement: true},
    denominacao:{type:DataType.STRING},
 },{ freezeTableName: true,modelName: "status",timestamps: false,
}); return Status;
}