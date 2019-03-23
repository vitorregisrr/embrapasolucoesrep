const { check, body, validationResult } = require('express-validator/check');

module.exports = [
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
                .render('public/solucao', {
                    path: 'solucao',
                    pageTitle: 'Emprapa Soluções - ' +req.body.titulo,
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
