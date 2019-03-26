const express = require('express'),
    router = express.Router(),
    setLocals = require('../middleware/set-locals');

const validators = {
        avaliacao: require('../middleware/validators/avaliacao'),
        solucao: require('../middleware/validators/solucao'),
        empresa: require('../middleware/validators/empresa'),
    }

const publicCtrl = {
    index: require('../controllers/public/index'),
    solucao: require('../controllers/public/solucao'),
    avaliacao: require('../controllers/public/avaliacao'),
    empresa: require('../controllers/public/empresa'),
}

//Index
router.get('/', publicCtrl.index.getIndex);

//Solução
router.get('/solucao/:solucaoCod', setLocals, publicCtrl.solucao.getSolucao);

//Submeter
router.get('/submeter', setLocals, publicCtrl.index.getSubmeter);

//POST solicitação empresa
router.post('/submeter', validators.empresa.solicitacao, publicCtrl.empresa.solicitarCadastro);

//Solicitação
router.get('/solucao/solicitar', setLocals, publicCtrl.solucao.getSolicitacao);
router.post('/solucao/solicitar', validators.solucao.solicitacao, publicCtrl.solucao.postSolicitacao);

//Avaliação
router.post('/solucao/avaliacao', setLocals, validators.avaliacao, publicCtrl.avaliacao.postAvaliacao);

module.exports = router;