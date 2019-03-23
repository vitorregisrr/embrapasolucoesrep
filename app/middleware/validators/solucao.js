const { check, body, validationResult } = require('express-validator/check');

exports.new = [
    // Express Validation
    [
        body('titulo', 'Entre uma senha válida!')
        .isLength({
            min: 8,
            max: 20
        })
        .withMessage('The a senha deve ter entre 8 e 20 letras!')
        .trim(),
    ],

    //Calback Function
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(422)
                .render('admin/solucao/nova', {
                    path: 'admin/solucao',
                    pageTitle: 'Nova solução',
                    errorMessage: errors.array(),
                    form: {
                        values: req.body,
                        hasError: errors.array().map(i => i.param)
                    },
                    user: req.body.user,
                    robotsFollow: false,
                })
        } else {
            next();
        }
    }

]

exports.edit = [
    [
        body('titulo', 'Entre uma senha válida!')
        .isLength({
            min: 8,
            max: 20
        })
        .withMessage('The a senha deve ter entre 8 e 20 letras!')
        .trim(),
    ],

    //Calback Function
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(422)
                .render('admin/solucao/editar', {
                    path: 'admin/solucao',
                    pageTitle: 'Editando solução',
                    errorMessage: errors.array(),
                    form: {
                        values: req.body,
                        hasError: errors.array().map(i => i.param)
                    },
                    user: req.body.user,
                    robotsFollow: false,
                })
        } else {
            next();
        }
    }
]



exports.newSolucao = [
    // Express Validation
    [
        body('titulo', 'Entre uma senha válida!')
        .isLength({
            min: 8,
            max: 20
        })
        .withMessage('The a senha deve ter entre 8 e 20 letras!')
        .trim(),
    ],

    //Calback Function
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(422)
                .render('admin/solucao/nova', {
                    path: 'admin/solucao',
                    pageTitle: 'Nova solução',
                    errorMessage: errors.array(),
                    form: {
                        values: req.body,
                        hasError: errors.array().map(i => i.param)
                    },
                    user: req.body.user,
                    robotsFollow: false,
                })
        } else {
            next();
        }
    }

]

exports.solicitacao = [
    [
        body('titulo', 'Entre uma senha válida!')
        .isLength({
            min: 8,
            max: 20
        })
        .withMessage('The a senha deve ter entre 8 e 20 letras!')
        .trim(),
    ],

    //Calback Function
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(422)
                .render('admin/solucao/editar', {
                    path: 'admin/solucao',
                    pageTitle: 'Editando solução',
                    errorMessage: errors.array(),
                    form: {
                        values: req.body,
                        hasError: errors.array().map(i => i.param)
                    },
                    user: req.body.user,
                    robotsFollow: false,
                })
        } else {
            next();
        }
    }

]