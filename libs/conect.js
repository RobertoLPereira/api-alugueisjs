const { postgresMd5PasswordHash } = require("pg/lib/utils");
const { Sequelize } = require("sequelize");
//console.log(process.env.DATABASE_URL);
const sequelizeCn = new Sequelize(process.env.DATABASE_URL,
	{dialectOptions:{
		dialect:'postgres',
		ssl:{rejectUnauthorized: false,},
	},});
//Verifica a conexao
sequelizeCn.authenticate()
	.then(() => console.log("Conexao com sucesso!"))
	.catch((err) => console.error("Não obteve sucesso na conexão",err));

module.exports = sequelizeCn;