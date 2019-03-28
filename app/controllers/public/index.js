const Solucao = require('../../models/solucao'),
    Empresa = require('../../models/empresa'),
    Avaliacao = require('../../models/avaliacao');

exports.getIndex = (req, res, next) => {
    const currentPage = req.query.page ? parseInt(req.query.page) : 1,
        ITEMS_PER_PAGE = 8;
    let totalItems;

    let query = {};
    if (req.query.search) {
        query = {
            $or: [{
                    'nome': {
                        $regex: req.query.search,
                        $options: 'i'
                    }
                },
                {
                    'descricao': {
                        $regex: req.query.search,
                        $options: 'i'
                    }
                },

                {
                    'categoria': {
                        $regex: req.query.search,
                        $options: 'i'
                    }
                },

                {
                    'empresa': {
                        $regex: req.query.search,
                        $options: 'i'
                    }
                },

                {
                    'link': {
                        $regex: req.query.search,
                        $options: 'i'
                    }
                }
            ]
        }
    }

    Solucao.find({
            status: 'aprovado',
            ...query
        })
        .countDocuments()
        .then(num => {
            totalItems = num;
            const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

            Solucao.find({
                    status: 'aprovado',
                    ...query
                })
                .skip((currentPage - 1) * ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE)
                .sort({
                    date: -1
                })
                .then(solucoes => {
                    res.render('public/home', {
                        pageTitle: '',
                        path: "/",
                        robotsFollow: true,
                        errorMessage: [],
                        form: {
                            values: req.query
                        },
                        solucoes,
                        hasNext: currentPage < totalPages,
                        hasPrevious: currentPage > 1,
                        totalPages,
                        currentPage,
                    })
                })
                .catch(err => next(err, 500))
        })
        .catch(err => next(err, 500))
}

exports.getSubmeter = (req, res, next) => {
    res.render('public/submeter', {
        pageTitle: '',
        path: "/",
        robotsFollow: true,
        errorMessage: [],
        form: false
    })
}