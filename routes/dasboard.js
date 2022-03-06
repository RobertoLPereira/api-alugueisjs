module.exports = app => {
    const Status = app.db.models.status;
    var wDashBoard = [{"Imoveis":{}},
    {"Contratos":{}},
    {"AlugueisemDia":{}},
    {"AlugueisVencidos":{}},
    {"PagoscomAtraso":{}},
    {"PagosemDia":{}},
    {"QuantidadeImoveis":[{}]}];
    var wRelatorio = new Object();
    wRelatorio.contratos = "";
    wRelatorio.alugueisemdia ="";
    wRelatorio.alugueisvencidos="";
    wRelatorio.pagoscomatraso="";
    wRelatorio.pagosemdia="";
    wRelatorio.quantidadeimoveis="";
    var wRelatorioL = [];
    app.route('/Relatorio')
      .get((req, res) => {
        Status.sequelize.query("SELECT ativos, sum, inativos FROM public.vw_contratos")
          .then(result => res.json(result[0]))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })   
      app.route('/DashBoard')
      .get((req, res) => {
        Status.sequelize.query("SELECT ativos, sum, inativos FROM public.vw_contratos")
          .then(result =>  {wRelatorio.contratos=result[0];
                    wDashBoard[0]["Contratos"] = result[0][0]
                  })
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
          //Alugueis em dia
          Status.sequelize.query("SELECT emdia, sum FROM public.vw_alugueis_emdia")
          .then(result =>  {wRelatorio.alugueisemdia=result[0];
                  wDashBoard[0]["AlugueisemDia"] =result[0][0]
                })
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
          //Alugueis vencidos
          Status.sequelize.query("SELECT vencidos, sum FROM public.vw_alugueis_vencidos")
          .then(result =>  {wRelatorio.alugueisvencidos=result[0];
                  wDashBoard[0]["AlugueisVencidos"] =result[0][0]})
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
          //Alugueis pagos em atraso
          Status.sequelize.query("SELECT pagosematraso FROM public.vw_pagos_ematraso")
          .then(result =>  {wRelatorio.pagoscomatraso=result[0];
                  wDashBoard[0]["PagoscomAtraso"] =result[0][0]})
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
          //Alugueis pagos em dia
          Status.sequelize.query("SELECT pagosemdia, sum FROM public.vw_pagos_emdia")
          .then(result =>  {wRelatorio.pagosemdia=result[0];
                  wDashBoard[0]["PagosemDia"] =result[0][0]})
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
          //Quantidade de imoveis
          Status.sequelize.query("SELECT idimovel,descricao, unidades FROM public.vw_quantidade_imoveis")
          .then(result =>  {
            wRelatorio.quantidadeimoveis=result[0];
                  wDashBoard[0]["QuantidadeImoveis"] =result[0];
                  wDashBoard[0]["Imoveis"] =result[0]
            console.log(wDashBoard[0]);
            var result2 = [];

            for(var i in wDashBoard[0])
                result2.push([i, wDashBoard[0] [i]]);
            console.log(result2);
            res.status(200).json(result2)
            })
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })    
  };