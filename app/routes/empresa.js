const express = require('express'),
    router = express.Router(),
    setLocals = require('../middleware/set-locals'),
    isAuth = require('../middleware/is-auth');

const validators = {
    solucao: require('../middleware/validators/solucao')
}

const empresaCtrl = {
    solucao: require('../controllers/empresa/solucao'),
    empresa: require('../controllers/empresa/empresa'),
    avaliacao: require('../controllers/empresa/avaliacao')
}

//INDEX 
router.get('/empresa', isAuth.empresa, setLocals, empresaCtrl.solucao.getSolucoes);
router.get('/empresa/editar', isAuth.empresa, setLocals, empresaCtrl.empresa.getEdit);
router.post('/empresa/editar', isAuth.empresa, setLocals, empresaCtrl.empresa.postEdit);

//SOLUCAO
    router.get('/empresa/solucoes', isAuth.empresa, setLocals, empresaCtrl.solucao.getSolucoes);
    //GET NEW
    router.get('/empresa/solucoes/new', isAuth.empresa, setLocals, empresaCtrl.solucao.getNewSolucao);
    //POST NEW
    router.post('/empresa/solucoes/new', isAuth.empresa, setLocals, validators.solucao.new, empresaCtrl.solucao.postNewSolucao);
    //OUTRAS FOTOS
    router.get('/empresa/solucao/outrasfotos/:id', isAuth.empresa, setLocals, empresaCtrl.solucao.getOutrasFotos);
    //GET EDIT
    router.get('/empresa/solucao/edit/:codigo', isAuth.empresa, setLocals, empresaCtrl.solucao.getEditSolucao);
    //POST EDIT
    router.post('/empresa/solucao/edit', isAuth.empresa, setLocals, validators.solucao.edit, empresaCtrl.solucao.postEditSolucao);
    //DELETE 
    router.post('/empresa/solucao/delete', isAuth.empresa, setLocals, empresaCtrl.solucao.deleteSolucao);
    //API
        //NOVA FOTO  PARA SOLUCAO
        router.post('/api/propiedade/novafoto', isAuth.empresa, empresaCtrl.solucao.setSolucaoImage);

        //REMOVER FOTO DO SOLUCAO
        router.post('/api/propiedade/removerfoto', isAuth.empresa, empresaCtrl.solucao.removeSolucaoImage);
      

//AVALIACOES
    router.get('/empresa/avaliacoes', isAuth.empresa, setLocals, empresaCtrl.avaliacao.getAvaliacoes);
    router.get('/empresa/avaliacoes/solicitacoes', isAuth.empresa, setLocals, empresaCtrl.avaliacao.getSolicitacoes);

     //APROVAR 
     router.post('/empresa/avaliacao/aprovar', isAuth.empresa, setLocals, empresaCtrl.avaliacao.aprovarAvaliacao);   
     //REJEITAR 
     router.post('/empresa/avaliacao/rejeitar', isAuth.empresa, setLocals, empresaCtrl.avaliacao.rejeitarAvaliacao);
     //PENDENCIAR 
     router.post('/empresa/avaliacao/pendenciar', isAuth.empresa, setLocals, empresaCtrl.avaliacao.pendenciarAvaliacao);   


module.exports = router;