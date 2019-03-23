const express = require('express'),
    router = express.Router(),
    setLocals = require('../middleware/set-locals'),
    isAuth = require('../middleware/is-auth');

const validators = {
    solucao: require('../middleware/validators/solucao')
}

const empresaCtrl = {
    solucao: require('../controllers/admin/solucao'),
    empresa: require('../controllers/admin/empresa'),
    avaliacao: require('../controllers/admin/avaliacao')
}

//INDEX 
router.get('/empresa', isAuth.empresa, setLocals, empresaCtrl.empresa.getSolucoes);

//SOLUCAO
    router.get('/empresa/solucoes/minhassolucoes', isAuth.empresa, setLocals, empresaCtrl.empresa.getSolucoes);

    //GET NEW
    router.get('/empresa/solucao/new', isAuth.empresa, setLocals, empresaCtrl.solucao.getNewSolucao);
    //POST NEW
    router.post('/empresa/solucao/new', isAuth.empresa, setLocals, validators.solucao.new, empresaCtrl.solucao.postNewSolucao);
    //GET EDIT
    router.get('/empresa/solucao/edit/:solucaoId', isAuth.empresa, setLocals, empresaCtrl.solucao.getEditSolucao);
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
    router.get('/empresa/avaliacoes', isAuth.empresa, setLocals, empresaCtrl.empresa.getAvaliacoes);
    router.get('/empresa/avaliacoes/solicitacoes', isAuth.empresa, setLocals, empresaCtrl.empresa.getSolicitacoes);

    //DELETE 
    router.post('/empresa/avaliacao/delete', isAuth.empresa, setLocals, empresaCtrl.avaliacao.deleteAvaliacao);   
    //ACCEPT 
    router.post('/empresa/avaliacao/accept', isAuth.empresa, setLocals, empresaCtrl.avaliacao.acceptAvaliacao);   


module.exports = router;