module.exports = app => {
    const Status = app.db.models.status;

    app.route('/Consultar/:condicao')
      .get((req, res) => {
        let wcondicao = req.params.condicao.replace("update", "xxxx");
        wcondicao = wcondicao.replace("delete", "xxxx");
        wcondicao = wcondicao.replace("insert", "xxxx");
        Status.sequelize.query(wcondicao)
          .then(result => res.json(result[0]))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });
  };