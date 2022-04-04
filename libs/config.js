module.exports = {
  database: 'ControleAluguel',
  username: 'postgres',
  password: 'rlp562',
  hostname: 'localhost',
  sslmode: require,
  params: {
    ssl:true,

    dialect: 'postgres',
    storage: 'ControleAluguel-db.postgres',
    define: {
      underscored: true
    },
    operatorsAliases: false
  }
};