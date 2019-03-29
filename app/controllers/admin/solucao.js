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
                    res.render('admin/solucao/solucoes', {
                        pageTitle: 'Soluções',
                        path: "admin/solucoes",
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
                    res.render('admin/solucao/solicitacoes', {
                        pageTitle: 'Solicitações de solução',
                        path: "admin/solucoes",
                        robotsFollow: false,
                        errorMessage: [],
                        solucoes: solucoes.filter(solucao => solucao.empresaId ? solucao.empresaId.status != 'pendente' : true),
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
            codigo: req.params.codigo
        })
        .populate('empresaId')
        .then(solucao => {
            if (!solucao) {
                return next(new Error('Solução não encontrada para editar.'), 500)
            }

            res.render('admin/solucao/editar', {
                pageTitle: 'Editar soluçao',
                path: "admin/solucoes",
                robotsFollow: false,
                errorMessage: [],
                solucao,
                form: false
            });
        })
        .catch(err => next(err, 500));
}

exports.getNewSolucao = (req, res, next) => {
    res.render('admin/solucao/nova', {
        pageTitle: 'Nova solução',
        path: "admin/solucoes/new",
        robotsFollow: false,
        errorMessage: [],
        form: false
    });
}

exports.postEditSolucao = (req, res, next) => {
    Solucao.findOne({
            _id: req.body.id
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
                                solucao.empresaId = req.body.empresaId;
                                solucao.link = req.body.link;
                                solucao.categoria = req.body.categoria;

                                if (req.body.empresaId && req.body.empresaId != '') {
                                    solucao.empresaId = req.body.empresaId;
                                }

                                solucao.save();
                                return res.redirect('/admin/solucoes')
                            })
                            .catch(err => next(err))
                    })
                    .catch(err => next(err));
            } else {


                if (req.body.empresaId && req.body.empresaId != '') {
                    solucao.empresaId = req.body.empresaId;
                }

                solucao.nome = req.body.nome;
                solucao.descricao = req.body.descricao;
                solucao.empresaId = req.body.empresaId;
                solucao.link = req.body.link;
                solucao.categoria = req.body.categoria;

                solucao.save();
                return res.redirect('/admin/solucoes')
            }
        })
        .catch(err => next(err));
}



exports.postNewSolucao = (req, res, next) => {

    const form = {
        ...req.body
    }

    if( form.empresaId == ''){
        delete form.empresaId;
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
                                status: 'aprovado'
                            })
                            .save()

                            .then(solucao => {
                                return res.redirect('/admin/solucao/outrasfotos/' + solucao.id);
                            })

                            .catch(err => next(err));
                    })
                    .catch(err => next(JSON.stringify(err)))
            })

    } else {
        new Solucao({
                ...form,
                status: 'aprovado'
            })
            .save()

            .then(solucao => {
                    return res.redirect('/admin/solucao/outrasfotos/' + solucao.id);
            })

            .catch(err => next(err));
    }
}

exports.setSolucaoImage = (req, res, next) => {
    Solucao.findOne({
            _id: req.body.id,
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


exports.aprovarSolucao = (req, res, next) => {

    Solucao.findOne({
            _id: req.body.id
        })
        .then(solucao => {
            if (!solucao) {
                res.redirect('/admin/solucoes/solicitacoes')
            }

            solucao.status = 'aprovado';
            solucao.save()
                .then(resul => res.redirect('/admin/solucoes/solicitacoes'))
                .catch(err => next(err, 500))
        })

        .catch(err => next(err));
}


exports.rejeitarSolucao = (req, res, next) => {

    Solucao.findOne({
            _id: req.body.id
        })
        .then(solucao => {
            if (!solucao) {
                res.redirect('/admin/solucoes/solicitacoes')
            }

            solucao.status = 'rejeitado';
            solucao.save()
                .then(solucao => res.redirect('/admin/solucoes/solicitacoes'))
                .catch(err => next(err, 500))
        })

        .catch(err => next(err));
}

exports.pendenciarSolucao = (req, res, next) => {

    Solucao.findOne({
            _id: req.body.id
        })
        .then(solucao => {
            if (!solucao) {
                res.redirect('/admin/solucoes/solicitacoes')
            }

            solucao.status = 'pendente';
            solucao.save()
                .then(solucao => res.redirect('/admin/solucoes/solicitacoes'))
                .catch(err => next(err, 500))
        })

        .catch(err => next(err));
}

exports.getOutrasFotos = (req, res, next) => {
    Solucao.findOne({
            _id: req.params.id
        })
        .then(solucao => {
            if (!solucao) {
                return res.redirect('/admin/solucoes')
            }

            res.render('admin/solucao/outrasfotos', {
                pageTitle: 'Outras fotos da solução',
                path: "admin/solucoes",
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
            _id: req.body.id
        })

        .then(solucao => {
            if (!solucao) {
                res.redirect('/admin/solucoes')
            }

            if (solucao.mainImage) {
                cloudinary.uploader.destroy(solucao.mainImage.public_id);
            }

            let destroyPromise = [];
            if (solucao.images.length > 0) {
                destroyPromise = solucao.images.map(img => cloudinary.uploader.destroy(img.public_id))
            }

            Promise.all(destroyPromise);

            return res.redirect('/admin/solucoes')
        })

        .catch(err => next(err));
}


exports.getByRegex = (req, res, next) => {
    const text = req.query.text;
    Solucao.find({
            nome: {
                $regex: text,
                $options: 'i'
            },
            status: 'aprovado'
        })
        .select('nome id codigo')
        .then(solucoes => {
            return res.status(200).json({
                solucoes
            });
        })
        .catch(err => {
            res.status(500).json(JSON.stringify([]));
            console.log(err)
        })
}