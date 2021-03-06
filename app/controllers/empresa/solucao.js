const Solucao = require('../../models/solucao'),
    Empresa = require('../../models/empresa'),
    Avaliacao = require('../../models/avaliacao'),
    cloudinary = require('../../util/cloudinary'),
    fileHelper = require('../../util/file-helper'),
    queryHelper = require('../../util/query-filter');

exports.getSolucoes = (req, res, next) => {
    const currentPage = req.query.page ? parseInt(req.query.page) : 1,
        ITEMS_PER_PAGE = 8;
    let totalItems;

    const query = queryHelper.solucao(req);
    query.empresaId = req.empresa;
    query.status = 'aprovado';
    Solucao.find({
            ...query
        })
        .countDocuments()
        .then(num => {
            totalItems = num;
            const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

            Solucao.find({
                    ...query
                })
                .populate('empresaId')
                .skip((currentPage - 1) * ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE)
                .sort({
                    date: -1
                })
                .then(solucoes => {
                    res.render('empresa/solucao/solucoes', {
                        pageTitle: 'Soluções',
                        path: "empresa/solucoes",
                        robotsFollow: false,
                        errorMessage: [],
                        solucoes,
                        form: {
                            values: req.query
                        },
                        hasNext: currentPage < totalPages,
                        hasPrevious: currentPage > 1,
                        totalPages,
                        currentPage
                    });
                })
                .catch(err => next(err, 500))
        })
        .catch(err => next(err, 500))
}

exports.getSolicitacoes = (req, res, next) => {
    const currentPage = req.query.page ? parseInt(req.query.page) : 1,
        ITEMS_PER_PAGE = 8;
    let totalItems;

    const query = queryHelper.solucao(req);
    query.empresaId = req.empresa;
    query.status = 'pendente';
    if (req.query.status == 'rejeitado') {
        query.status = 'rejeitado';
    }
    Solucao.find({
            ...query
        })
        .countDocuments()
        .then(num => {
            totalItems = num;
            const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

            Solucao.find({
                    ...query
                })
                .skip((currentPage - 1) * ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE)
                .populate('empresaId')
                .sort({
                    date: -1
                })
                .then(solucoes => {
                    res.render('empresa/solucao/solicitacoes', {
                        pageTitle: 'Solicitações de solução',
                        path: "empresa/solucoes",
                        robotsFollow: false,
                        errorMessage: [],
                        solucoes,
                        form: {
                            values: req.query
                        },
                        hasNext: currentPage < totalPages,
                        hasPrevious: currentPage > 1,
                        totalPages,
                        currentPage
                    });
                })
                .catch(err => next(err, 500))
        })
        .catch(err => next(err, 500))
}

exports.getEditSolucao = (req, res, next) => {
    Solucao.findOne({
            codigo: req.params.codigo,
            empresaId : req.empresa
        })
        .populate('empresaId')
        .then(solucao => {
            if (!solucao) {
                return next(new Error('Solução não encontrada para editar.'), 500)
            }

            res.render('empresa/solucao/editar', {
                pageTitle: 'Editar soluçao',
                path: "empresa/solucoes",
                robotsFollow: false,
                errorMessage: [],
                solucao,
                form: false
            });
        })
        .catch(err => next(err, 500));
}

exports.getNewSolucao = (req, res, next) => {
    res.render('empresa/solucao/nova', {
        pageTitle: 'Nova solução',
        path: "empresa/solucoes/new",
        robotsFollow: false,
        errorMessage: [],
        form: false
    });
}

exports.postEditSolucao = (req, res, next) => {
    Solucao.findOne({
            _id: req.body.id,
            empresaId: req.empresa
        })
        .then(solucao => {

            if (!solucao) {
                return next(new Error('Houve um erro e a solução não foi encontrada, volte e tente novamente.'));
            }

            if (req.file) {
                if (solucao.mainImage) {
                    cloudinary.uploader.destroy(solucao.mainImage.public_id)
                }

                fileHelper.compressImage(req.file, 700)
                    .then(newPath => {
                        cloudinary.uploader.upload(newPath)
                            .then(image => {
                                fileHelper.delete(newPath);

                                solucao.mainImage = image;
                                solucao.nome = req.body.nome;
                                solucao.descricao = req.body.descricao;
                                solucao.link = req.body.link;
                                solucao.categoria = req.body.categoria;

                                solucao.save();
                                return res.redirect('/empresa/solucoes')
                            })
                            .catch(err => next(err))
                    })
                    .catch(err => next(err));
            } else {

                solucao.nome = req.body.nome;
                solucao.descricao = req.body.descricao;
                solucao.link = req.body.link;
                solucao.categoria = req.body.categoria;

                solucao.save();
                return res.redirect('/empresa/solucoes')
            }
        })
        .catch(err => next(err));
}



exports.postNewSolucao = (req, res, next) => {

    const form = {
        ...req.body
    }

    if (req.file) {
        fileHelper.compressImage(req.file, 700)
            .then(newPath => {
                cloudinary.uploader.upload(newPath)
                    .then(image => {
                        fileHelper.delete(newPath);

                        new Solucao({
                                ...form,
                                mainImage: image,
                                status: 'aprovado',
                                empresaId : req.empresa
                            })
                            .save()

                            .then(solucao => {
                                    return res.redirect('/empresa/solucao/outrasfotos/' + solucao.id);
                                
                            })

                            .catch(err => next(err));
                    })
                    .catch(err => next(JSON.stringify(err)))
            })

    } else {
        new Solucao({
                ...form,
                status: 'aprovado',
                empresaId : req.empresa
            })
            .save()

            .then(solucao => {
                    return res.redirect('/empresa/solucao/outrasfotos/' + solucao.id);
            })

            .catch(err => next(err));
    }
}

exports.setSolucaoImage = (req, res, next) => {
    Solucao.findOne({
            _id: req.body.id,
            empresaId: req.empresa
        })
        .then(solucao => {
            if (!solucao) {
                return res.status(500).json({
                    "message": "Houve um erro no servidor e a solução não foi encontrada.",
                });
            }

            fileHelper.compressImage(req.file, 700)
                .then(newPath => {

                    cloudinary.uploader.upload(newPath)
                        .then(image => {
                            fileHelper.delete(newPath);
                            solucao.images.push(image);
                            solucao.save()
                                .then(resul => {
                                    return res.status(200).json(JSON.stringify(image));
                                })
                                .catch(err => {
                                    cloudinary.uploader.destroy(image.public_id)
                                    res.status(500).json({
                                        "message": err
                                    });
                                });
                        })
                        .catch(err => res.status(500).json({
                            "message": err
                        }))

                })
                .catch(err => res.status(500).json({
                    "message": err
                }))

        })
        .catch(err => res.status(500).json({
            "message": err
        }))
}

exports.removeSolucaoImage = (req, res, next) => {
    const solucaoId = req.body.solucaoId;
    const imageId = req.body.imageId;

    Solucao.findOne({
            _id: solucaoId,
            empresaId: req.empresa
        })

        .then(solucao => {
            if (!solucao) {
                return res.status(500).json({
                    "message": "Houve um erro no servidor e a solucaoiedade não foi encontrada.",
                });
            }

            const oldImages = solucao.images;

            solucao.images = oldImages.filter(image => image.public_id != imageId);

            solucao.save()
                .then(resul => {
                    cloudinary.uploader.destroy(imageId)
                        .then(resul => {
                            return res.status(200).json({
                                success: true
                            });
                        })
                        .catch(err => {
                            cloudinary.uploader.destroy(image.public_id)
                            res.status(500).json({
                                'message': "Falha na hora de apagar a imagem do servidor"
                            });
                        });
                })
                .catch(err => res.status(500).json({
                    'message': "Falha na hora de salvar as alterações" + err
                }))

        })
        .catch(err => res.status(500).json({
            'message': "Falha na hora de buscar no BD" + err
        }))
}


exports.getOutrasFotos = (req, res, next) => {
    Solucao.findOne({
            _id: req.params.id,
            empresaId: req.empresa
        })
        .then(solucao => {
            if (!solucao) {
                return res.redirect('/empresa/solucoes')
            }

            res.render('empresa/solucao/outrasfotos', {
                pageTitle: 'Outras fotos da solução',
                path: "empresa/solucoes",
                robotsFollow: false,
                errorMessage: [],
                form: false,
                solucao
            });
        })
        .catch(err => next(err, 500));
}


exports.deleteSolucao = (req, res, next) => {
    Solucao.findOneAndDelete({
            _id: req.body.id,
            empresaId: req.empresa
        })

        .then(solucao => {
            if (!solucao) {
                res.redirect('/empresa/solucoes')
            }

            if (solucao.mainImage) {
                cloudinary.uploader.destroy(solucao.mainImage.public_id);
            }

            let destroyPromise = [];
            if (solucao.images.length > 0) {
                destroyPromise = solucao.images.map(img => cloudinary.uploader.destroy(img.public_id))
            }

            Promise.all(destroyPromise);

            return res.redirect('/empresa/solucoes')
        })

        .catch(err => next(err));
}
