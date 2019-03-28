const Solucao = require('../../models/solucao'),
    Empresa = require('../../models/empresa'),
    Avaliacao = require('../../models/avaliacao'),
    cloudinary = require('../../util/cloudinary'),
    fileHelper = require('../../util/file-helper');

exports.postAvaliacao = (req, res, next) => {
    if (req.file) {
        fileHelper.compressImage(req.file, 700)
            .then(newPath => {
                cloudinary.uploader.upload(newPath)
                    .then(image => {
                        fileHelper.delete(newPath);
                        new Avaliacao({
                                ...req.body,
                                status: 'pendente',
                                image,
                            })
                            .save()
                            .then(avaliacao => {
                                Solucao.findOne({
                                        _id: req.body.solucaoId
                                    })
                                    .then(solucao => {
                                        Avaliacao.find({
                                                solucaoId: solucao,
                                                status: 'aprovado'
                                            })
                                            .then(avaliacoes => {
                                                return res
                                                    .status(422)
                                                    .render('public/solucao', {
                                                        path: 'solucao',
                                                        pageTitle: 'Emprapa Soluções - ' + req.body.titulo,
                                                        errorMessage: [],
                                                        form: false,
                                                        robotsFollow: true,
                                                        showAvaliacao: false,
                                                        showSuccess: true,
                                                        solucao,
                                                        avaliacoes
                                                    });
                                            })
                                            .catch(err => next(err, 500))
                                    })
                                    .catch(err => next(err, 500))
                            })
                            .catch(err => next(err, 500));
                    })
                    .catch(err => next(JSON.stringify(err)))
            })
            .catch(err => next(err, 500));

    } else {
        new Avaliacao({
                ...req.body,
                status: 'pendente'
            })
            .save()
            .then(avaliacao => {
                Solucao.findOne({
                        _id: req.body.solucaoId
                    })
                    .then(solucao => {
                        Avaliacao.find({
                                solucaoId: solucao
                            })
                            .then(avaliacoes => {
                                return res
                                    .status(422)
                                    .render('public/solucao', {
                                        path: 'solucao',
                                        pageTitle: 'Emprapa Soluções - ' + req.body.titulo,
                                        errorMessage: [],
                                        form: false,
                                        robotsFollow: true,
                                        showAvaliacao: false,
                                        showSuccess: true,
                                        solucao,
                                        avaliacoes
                                    });
                            })
                            .catch(err => next(err, 500))
                    })
                    .catch(err => next(err, 500))
            })
            .catch(err => next(err, 500));
    }

}