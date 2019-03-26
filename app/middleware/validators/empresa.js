const { check, body, validationResult } = require('express-validator/check');

exports.solicitacao = [
    [
        body('nome', 'O campo nome é obrigatório.')
        .isLength({
            min: 4,
            max:20
        })
        .withMessage('O nome deve ter entre 4 e 20 letras'),

        body('email', 'O campo e-mail é obrigatório.')
        .isEmail()
        .withMessage('O e-mail que você entrou é invalido.')
        .trim(),

        body('telefone', 'O campo telefone é obrigatório.'),
        
        body('nome_solucao', 'O nome da solução é inválido.')
        .isLength({
            min: 4,
            max: 30
        })
        .withMessage('O nome da solução deve ter entre 4 e 30 letras.'),

        body('link_solucao', 'O link da solução é inválido.')
        .isURL()
        .withMessage('O link da solução não parece ter formato de uma URL.')
        .trim(),

        body('categoria_solucao', 'O campo categoria da solução é obrigatório'),
        
        body('descricao_solucao', 'A descrição da solução é inválido.')
        .isLength({
            min: 30
        })
        .withMessage('A descrição da solução deve ter no  minímo 30 letras.')
    ],

    //Calback Function
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(422)
                .render('public/submeter', {
                    path: '/submeter',
                    errorMessage: errors.array(),
                    form: {
                        values: req.body,
                        hasError: errors.array().map(i => i.param)
                    },
                    csrfToken: req.csrfToken()
                })
        } else {
            next();
        }
    }

]
exports.new = [
    [
        body('nome', 'O campo nome é obrigatório.')
        .isLength({
            min: 4,
            max:30
        })
        .withMessage('O nome deve ter entre 4 e 30 letras'),

        body('email', 'O campo e-mail é obrigatório.')
        .isEmail()
        .withMessage('O e-mail que você entrou é invalido.')
        .trim(),

        body('telefone', 'O campo telefone é obrigatório.'),
    ],

    //Calback Function
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(422)
                .render('admin/empresas/new', {
                    path: 'admin/empresa',
                    pageTitle: 'Nova Empresa',
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
                .render('admin/empresa/editar', {
                    path: 'admin/empresa',
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