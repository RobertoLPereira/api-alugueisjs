//Faça um replace na instrucao select das aspas duplas que estao em duplicidade
	 // confere se o nome do campo primary key da faixadeconsumoela está correto
	 
	 module.exports = app => {
    const Faixadeconsumo = app.db.models.faixadeconsumo;

    app.route('/Faixadeconsumo')
      .get((req, res) => {
        Faixadeconsumo.findAll({})
          .then(result => { 
            res.json(result)})
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .post((req, res) => {
        //console.log(req)
        var faixadeconsumo = {
          idfaixadeconsumo: req.body.idfaixadeconsumo,
          denominacao: req.body.denominacao,
          faixainicial: req.body.faixainicial,
          faixafinal: req.body.faixafinal,
          tarifaagua: req.body.tarifaagua,
          tarifaesgoto: req.body.tarifaesgoto,
          tfdi: req.body.tfdi,
          idimovel: req.body.idimovel,
          }
        //console.log(faixadeconsumo)
        Faixadeconsumo.create(faixadeconsumo)
          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      }).put((req, res) => {
        
         var sqlupdate = "update faixadeconsumo set denominacao='"+ req.body.denominacao+"',"+
          "faixainicial="+req.body.faixainicial+",faixafinal="+req.body.faixafinal+","+
          "tarifaagua="+ req.body.tarifaagua+",tarifaesgoto="+req.body.tarifaesgoto+","+
          "tfdi="+req.body.tfdi+",idimovel="+req.body.idimovel+
          " where idfaixadeconsumo="+req.body.idfaixadeconsumo;
        
        Faixadeconsumo.sequelize.query(sqlupdate)
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });

    app.route('/Faixadeconsumo/:idfaixadeconsumo')
      .get((req, res) => {
        var idfaixadeconsumo = parseInt(req.params.idfaixadeconsumo);
        Faixadeconsumo.findOne({where:idfaixadeconsumo})
          .then(result => {
            if (result) {
              res.json(result);
            } else {
              res.sendStatus(404);
            }
          })
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      app.route('/faixadeconsumoM/:idfaixadeconsumo')
      .get((req, res) => {
        var idfaixadeconsumo = parseInt(req.params.idfaixadeconsumo);
        Faixadeconsumo.sequelize.query("select ai.* from faixadeconsumo where a.idfaixadeconsumo="+idfaixadeconsumo)
          .then(result => res.json(result[0]))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      }).put((req, res) => {
        console.log(req);
         var faixadeconsumo = {
          idfaixadeconsumo: req.body.idfaixadeconsumo,
          denominacao: req.body.denominacao,
          faixainicial: req.body.faixainicial,
          faixafinal: req.body.faixafinal,
          tarifaagua: req.body.tarifaagua,
          tarifaesgoto: req.body.tarifaesgoto,
          tfdi: req.body.tfdi,
          idimovel: req.body.idimovel,
          }
        Faixadeconsumo.update(req.body, {where: req.params})
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .delete((req, res) => {
        Faixadeconsumo.destroy({where: req.params})
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(204).json({msg: error.message});
          });
      });

  };