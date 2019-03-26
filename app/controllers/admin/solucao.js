const Solucao = require('../../models/solucao'),
    Empresa = require('../../models/empresa'),
    Avaliacao = require('../../models/avaliacao'),
    cloudinary = require('../../util/cloudinary');

exports.getSolucoes = (req, res, next) => {
    Solucao.find({
            status: 'aprovado'
        })
        .populate('empresaId')
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
                form: false
            });
        })
        .catch(err => next(err, 500))
}

exports.getSolicitacoes = (req, res, next) => {
    Solucao.find({
            status: 'pendente'
        })
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
            });
        })
        .catch(err => next(err, 500))
}

exports.getEditSolucao = (req, res, next) => {
    Solucao.findOne({
            codigo: req.params.codigo
        })
        .populate('empresaId')
        .then(solucao => {
            if(!solucao){
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

                                if (req.body.empresaId && req.body.empresaId != '' && !req.session.empresa) {
                                    solucao.empresaId = req.body.empresaId;
                                }

                                solucao.save();
                                return res.redirect('/admin/solucoes')
                            })
                            .catch(err => next(err))
                    })
                    .catch(err => next(err));
            } else {


                if (req.body.empresaId && req.body.empresaId != '' && !req.session.empresa) {
                    solucao.empresaId = req.body.empresaId;
                }

                solucao.mainImage = image;
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
                                if (req.session.empresa) {
                                    return res.redirect('/empresa/solucao/outrasfotos/' + solucao.id);
                                }

                                if (req.session.admin) {
                                    return res.redirect('/admin/solucao/outrasfotos/' + solucao.id);
                                }
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
                if (req.session.empresa) {
                    return res.redirect('/empresa/solucao/outrasfotos/' + solucao.id);
                }

                if (req.session.admin) {
                    return res.redirect('/admin/solucao/outrasfotos/' + solucao.id);
                }
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
            .then( resul => res.redirect('/admin/solucoes/solicitacoes'))
            .catch( err => next(err, 500))
        })

        .catch(err => next(err));
}


exports.rejeitarSolucao = (req, res, next) => {

    Solucao.findOne({
            _id: req.body.id
        })
        .then(solucao => {
            if (!solucao) {
                res.redirect('/admin/solucaos/solicitacoes')
            }

            solucao.status = 'rejeitado';
            solucao.save()
            .then( solucao => res.redirect('/admin/solucoes/solicitacoes') )
            .catch( err => next(err, 500))
        })

        .catch(err => next(err));
}

exports.pendenciarSolucao = (req, res, next) => {

    Solucao.findOne({
            _id: req.body.id
        })
        .then(solucao => {
            if (!solucao) {
                res.redirect('/admin/solucaos/solicitacoes')
            }

            solucao.status = 'pendente';
            solucao.save()
            .then( solucao => res.redirect('/admin/solucoes/solicitacoes') )
            .catch( err => next(err, 500))
        })

        .catch(err => next(err));
}

exports.getOutrasFotos = (req, res, next) => {
    Solucao.findOne({ _id: req.params.id })
    .then( solucao => {
        if(!solucao){
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
    .catch( err => next(err, 500));
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