const express = require('express'),
    router = express.Router();

const validators = {
        avaliacao: require('../middleware/validators/avaliacao'),
        solucao: require('../middleware/validators/solucao')
    }

const publicCtrl = {
    index: require('../controllers/public/index'),
    solucao: require('../controllers/public/solucao'),
    avaliacao: require('../controllers/public/avaliacao'),
}

//Index
router.get('/', publicCtrl.index.getIndex);

//Solução
router.get('/solucao/:solucaoCod', publicCtrl.solucao.getSolucao);

//Solicitação
router.get('/solucao/solicitar', publicCtrl.solucao.getSolicitacao);
router.post('/solucao/solicitar', validators.solucao.solicitacao, publicCtrl.solucao.postSolicitacao);

//Avaliação
router.post('/solucao/avaliacao', validators.avaliacao, publicCtrl.avaliacao.postAvaliacao);

module.exports = router;