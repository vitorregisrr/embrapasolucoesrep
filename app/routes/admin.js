const express = require('express'),
    router = express.Router(),
    setLocals = require('../middleware/set-locals'),
    isAuth = require('../middleware/is-auth');

const validators = {
    solucao: require('../middleware/validators/solucao'),
    empresa: require('../middleware/validators/empresa')
}

const adminCtrl = {
    solucao: require('../controllers/admin/solucao'),
    avaliacao: require('../controllers/admin/avaliacao'),
    empresa: require('../controllers/admin/empresa')
}

//INDEX 
router.get('/admin', isAuth.admin, setLocals, adminCtrl.empresa.getSolicitacoes);

//SOLUCAO
    router.get('/admin/solucoes', isAuth.admin, setLocals, adminCtrl.solucao.getSolucoes);
    router.get('/admin/solucoes/solicitacoes', isAuth.admin, setLocals, adminCtrl.solucao.getSolicitacoes);

    //GET NEW
    router.get('/admin/solucoes/new', isAuth.admin, setLocals, adminCtrl.solucao.getNewSolucao);
    //POST NEW
    router.post('/admin/solucoes/new', isAuth.admin, setLocals, validators.solucao.new, adminCtrl.solucao.postNewSolucao);
    //GET EDIT
    router.get('/admin/solucao/edit/:solucaoId', isAuth.admin, setLocals, adminCtrl.solucao.getEditSolucao);
    //POST EDIT
    router.post('/admin/solucao/edit', isAuth.admin, setLocals, validators.solucao.edit, adminCtrl.solucao.postEditSolucao);
    //DELETE 
    router.post('/admin/solucao/delete', isAuth.admin, setLocals, adminCtrl.solucao.deleteSolucao);
    //API
        //NOVA FOTO  PARA SOLUCAO
        router.post('/api/solucao/novafoto', isAuth.admin, adminCtrl.solucao.setSolucaoImage);

        //REMOVER FOTO DO SOLUCAO
        router.post('/api/solucao/removerfoto', isAuth.admin, adminCtrl.solucao.removeSolucaoImage);


//EMPRESA
    router.get('/admin/empresas', isAuth.admin, setLocals, adminCtrl.empresa.getEmpresas);
    router.get('/admin/empresas/solicitacoes', isAuth.admin, setLocals, adminCtrl.empresa.getSolicitacoes);
    router.get('/admin/empresa/:empresaCod', isAuth.admin, setLocals, adminCtrl.empresa.getEmpresa);

    //GET NEW
    router.get('/admin/empresas/new', isAuth.admin, setLocals, adminCtrl.empresa.getNewEmpresa);
    //POST NEW
    router.post('/admin/empresas/new', isAuth.admin, setLocals, validators.empresa.new, adminCtrl.empresa.getEmpresa);
    //GET EDIT
    router.get('/admin/empresa/edit/:empresaId', isAuth.admin, setLocals, adminCtrl.empresa.getEditEmpresa);
    //POST EDIT
    router.post('/admin/empresa/edit', isAuth.admin, setLocals, validators.empresa.edit, adminCtrl.empresa.postEditEmpresa);
    //DELETE 
    router.post('/admin/empresa/delete', isAuth.admin, setLocals, adminCtrl.empresa.deleteEmpresa);   
    
//AVALIACOES
    router.get('/admin/avaliacoes', isAuth.admin, setLocals, adminCtrl.avaliacao.getAvaliacoes);
    router.get('/admin/avaliacoes/solicitacoes', isAuth.admin, setLocals, adminCtrl.avaliacao.getSolicitacoes);
    //DELETE 
    router.post('/admin/avaliacao/delete', isAuth.admin, setLocals, adminCtrl.avaliacao.deleteAvaliacao);   
    //ACCEPT 
    router.post('/admin/avaliacao/accept', isAuth.admin, setLocals, adminCtrl.avaliacao.acceptAvaliacao);   


module.exports = router;