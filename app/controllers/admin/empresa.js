const Solucao = require('../../models/solucao'),
    Empresa = require('../../models/empresa'),
    Avaliacao = require('../../models/avaliacao'),
    transporter = require('../../util/email-transporter')(),
    queryHelper = require('../../util/query-filter');

exports.getEmpresas = (req, res, next) => {
    const currentPage = req.query.page ? parseInt(req.query.page) : 1,
        ITEMS_PER_PAGE = 8;
    let totalItems;

    const query = queryHelper.empresa(req);
    query.status = 'aprovado';

    Empresa.find({
            ...query
        })
        .countDocuments()
        .then(num => {
            totalItems = num;
            const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

            Empresa.find({
                    ...query
                })
                .skip((currentPage - 1) * ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE)
                .then(empresas => {
                    res.render('admin/empresa/empresas', {
                        pageTitle: 'Soluções',
                        path: "admin/empresas",
                        robotsFollow: false,
                        errorMessage: [],
                        empresas,
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

exports.getEmpresa = (req, res, next) => {
    Empresa.findOne({
            _id: req.params.id
        })
        .then(empresa => {
            if (!empresa) {
                res.redirect('/admin/empresas')
            }

            Solucao.find({
                    empresaId: empresa
                })
                .then(solucoes => {
                    res.render('admin/empresa/empresa', {
                        pageTitle: 'Empresa',
                        path: "admin/empresas",
                        robotsFollow: false,
                        errorMessage: [],
                        empresa,
                        solucoes,
                        form: false
                    });
                })
                .catch(err => next(err, 500));
        })
        .catch(err => next(err, 500))
}

exports.getSolicitacoes = (req, res, next) => {
    const currentPage = req.query.page ? parseInt(req.query.page) : 1,
        ITEMS_PER_PAGE = 8;
    let totalItems;

    const query = queryHelper.empresa(req);
    query.status = 'pendente';
    if (req.query.status == 'rejeitado') {
        query.status = 'rejeitado';
    }

    Empresa.find({
            ...query
        })
        .countDocuments()
        .then(num => {
            totalItems = num;
            const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

            Empresa.find({
                    ...query
                })
                .skip((currentPage - 1) * ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE)
                .then(empresas => {
                    res.render('admin/empresa/solicitacoes', {
                        pageTitle: 'Solicitações de Empresas',
                        path: "admin/empresas/solicitacoes",
                        robotsFollow: false,
                        errorMessage: [],
                        empresas,
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

exports.getEditEmpresa = (req, res, next) => {
    Empresa.findOne({
            _id: req.params.id
        })
        .then(empresa => {
            if (!empresa) {
                next(new Error('Empresa não encontrada para editar'), 500)
            }
            res.render('admin/empresa/editar', {
                pageTitle: 'Editar soluçao',
                path: "admin/empresas",
                robotsFollow: false,
                errorMessage: [],
                form: false,
                empresa
            });
        })
        .catch(err => next(err, 500))
}

exports.getNewEmpresa = (req, res, next) => {
    res.render('admin/empresa/nova', {
        pageTitle: 'Nova empresa',
        path: "admin/empresas/new",
        robotsFollow: false,
        errorMessage: [],
        form: false
    });
}

exports.postEditEmpresa = (req, res, next) => {
    Empresa.findOne({
            _id: req.body.id
        })
        .then(empresa => {

            if (!empresa) {
                return next(new Error('Houve um erro e a emoresa não foi encontrada, volte e tente novamente.'));
            }

            if (req.file) {
                if (empresa.mainImage) {
                    cloudinary.uploader.destroy(empresa.mainImage.public_id)
                }

                fileHelper.compressImage(req.file, 700)
                    .then(newPath => {
                        cloudinary.uploader.upload(newPath)
                            .then(image => {
                                fileHelper.delete(newPath);

                                empresa.mainImage = image;
                                empresa.nome = req.body.nome;
                                empresa.encarregado = req.body.encarregado;
                                empresa.email = req.body.email;
                                empresa.telefone = req.body.telefone;

                                empresa.save()
                                    .then(empresa => {
                                        return res.redirect('/admin/empresa/' + empresa._id)
                                    })
                                    .catch(err => next(err, 500))

                            })
                            .catch(err => next(err))
                    })
                    .catch(err => next(err));
            } else {

                empresa.nome = req.body.nome;
                empresa.encarregado = req.body.encarregado;
                empresa.email = req.body.email;
                empresa.telefone = req.body.telefone;
                
                empresa.save()
                    .then(empresa => {
                        return res.redirect('/admin/empresa/' + empresa._id)
                    })
                    .catch(err => next(err, 500))
            }
        })
        .catch(err => next(err));
}

exports.postNewEmpresa = (req, res, next) => {
    new Empresa({
            ...req.body,
            status: 'aprovado'
        })
        .save()
        .then(empresa => {
            res.redirect('/admin/empresas')
        })
        .catch(err => next(err, 500));
}

exports.getAvaliacoes = (req, res, next) => {
    Avaliacao.find({
            status: 'aprovado'
        })
        .then(avaliacoes => {
            res.render('admin/avaliacao/avaliacoes', {
                pageTitle: 'Ver avaliações',
                path: "admin/avaliacoes",
                robotsFollow: false,
                errorMessage: [],
                avaliacoes,
                form: false
            });
        })
        .catch(err => next(err, 500));
}

exports.getSolucoes = (req, res, next) => {
    res.render('admin/empresa/solicitacoes', {
        pageTitle: 'Solicitações de Empresas',
        path: "admin/empresas",
        robotsFollow: false,
        errorMessage: [],
        form: false
    });
}

exports.deleteEmpresa = (req, res, next) => {

    Empresa.findOneAndDelete({
            _id: req.body.id
        })
        .then(empresa => {
            if (!empresa) {
                res.redirect('/admin/empresas')
            }

            if (empresa.mainImage) {
                cloudinary.uploader.destroy(empresa.mainImage.public_id);
            }

            return res.redirect('/admin/empresas')

        })

        .catch(err => next(err));
}

exports.aprovarEmpresa = (req, res, next) => {

    Empresa.findOne({
            _id: req.body.id
        })
        .then(empresa => {
            if (!empresa) {
                res.redirect('/admin/empresas/solicitacoes')
            }

            empresa.usuario = empresa.email.split('@')[0];
            empresa.password = empresa.id;
            empresa.status = 'aprovado';
            empresa.save()
                .then(empresa => {
                    Solucao.find({
                            empresaId: empresa
                        })
                        .then(solucoes => {
                            return solucoes.forEach(solucao => {
                                solucao.status = 'pendente';
                                solucao.save();
                            });
                        })
                        .then(resul => {
                            transporter.sendMail({
                                    to: empresa.email,
                                    from: 'embrapasolucoes@gmail.com',
                                    subject: 'Sua empresa foi aprovada no Embrapa Soluções!',
                                    html: `
                            <h3> Oi ${empresa.encarregado}, estamos entrando em contato porque sua solicitação de cadastro foi aceita! </h3>
                            <h4> Segue os seu login para ter acesso ao sistema e cadastrar suas soluções: </h4>
                            <p> Usuário: ${empresa.usuario} </p>
                            <p> Senha: ${ empresa.password }</p>
                            <h4> Agora basta acessar <a href="http://embrapasolucoes.herokuapp.com/submeter">esta página</a>, clicar em "Já sou cadastrado" e fazer o login com estes dados! Qualquer dúvida estamos a disposição :) </h4>
                        `
                                })
                                .then(resul => {

                                    res.redirect('/admin/empresas/solicitacoes')
                                })
                                .catch(err => next(err, 500))
                        })
                        .catch(err => nex(err, 500));
                })
                .catch(err => next(err, 500))
        })

        .catch(err => next(err));
}


exports.rejeitarEmpresa = (req, res, next) => {

    Empresa.findOne({
            _id: req.body.id
        })
        .then(empresa => {
            if (!empresa) {
                res.redirect('/admin/empresas/solicitacoes')
            }

            empresa.status = 'rejeitado';
            empresa.save()
                .then(empresa => res.redirect('/admin/empresas/solicitacoes'))
                .catch(err => next(err, 500))
        })

        .catch(err => next(err));
}

exports.getByRegex = (req, res, next) => {
    const text = req.query.text;
    Empresa.find({
            nome: {
                $regex: text,
                $options: 'i'
            },
            status: 'aprovado'
        })
        .select('nome id codigo')
        .then(empresas => {
            return res.status(200).json({
                empresas
            });
        })
        .catch(err => {
            res.status(500).json(JSON.stringify([]));
            console.log(err)
        })
}


exports.pendenciarEmpresa = (req, res, next) => {

    Empresa.findOne({
            _id: req.body.id
        })
        .then(empresa => {
            if (!empresa) {
                res.redirect('/admin/empresas/solicitacoes')
            }

            empresa.status = 'pendente';
            empresa.save()
                .then(empresa => res.redirect('/admin/empresas/solicitacoes'))
                .catch(err => next(err, 500))
        })

        .catch(err => next(err));
}