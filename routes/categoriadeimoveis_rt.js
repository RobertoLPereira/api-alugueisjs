//Faça um replace na instrucao select das aspas duplas que estao em duplicidade
	 // confere se o nome do campo primary key da categoriadeimoveisela está correto
	 
	 module.exports = app => {
        const Categoriadeimoveis = app.db.models.categoriadeimoveis;
    
        app.route('/Categoriadeimoveis')
          .get((req, res) => {
            Categoriadeimoveis.findAll({})
              .then(result => res.json(result))
              .catch(error => {
                res.status(412).json({msg: error.message});
              });
          })
          .post((req, res) => {
            //console.log(req)
            var categoriadeimoveis = {
              idcategoriadeimoveis: req.body.idcategoriadeimoveis,
    denominacao: req.body.denominacao,
              }
            //console.log(categoriadeimoveis)
            Categoriadeimoveis.create(categoriadeimoveis)
              .then(result => res.json(result))
              .catch(error => {
                res.status(412).json({msg: error.message});
              });
          });
    
        app.route('/Categoriadeimoveis/:idcategoriadeimoveis')
          .get((req, res) => {
            var idcategoriadeimoveis = parseInt(req.params.idcategoriadeimoveis);
            Categoriadeimoveis.findOne({where:idcategoriadeimoveis})
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
          app.route('/categoriadeimoveisM/:idcategoriadeimoveis')
          .get((req, res) => {
            var idcategoriadeimoveis = parseInt(req.params.idcategoriadeimoveis);
            Categoriadeimoveis.sequelize.query("select ai.* from categoriadeimoveis where a.idcategoriadeimoveis="+idcategoriadeimoveis)
              .then(result => res.json(result[0]))
              .catch(error => {
                res.status(412).json({msg: error.message});
              });
          })
          .put((req, res) => {
             var categoriadeimoveis = {
              idcategoriadeimoveis: req.body.idcategoriadeimoveis,
              denominacao: req.body.denominacao,
              }
            Categoriadeimoveis.sequelize.query("Update categoriadeimoveis set denominacao = '"+req.body.denominacao+"' where idcategoriadeimoveis="+req.body.idcategoriadeimoveis)
              .then(result => res.sendStatus(204))
              .catch(error => {
                res.status(412).json({msg: error.message});
              });
          })
          .delete((req, res) => {
            Categoriadeimoveis.destroy({where: req.params})
              .then(result => res.sendStatus(204))
              .catch(error => {
                res.status(204).json({msg: error.message});
              });
          });
    
      };