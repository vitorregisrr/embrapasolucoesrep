const Solucao = require('../../models/solucao'),
    Empresa = require('../../models/empresa'),
    Avaliacao = require('../../models/avaliacao'),
    transporter = require('../../util/email-transporter')();

exports.getEmpresas = (req, res, next) => {
    Empresa.find({
            status: 'aprovado'
        })
        .then(empresas => {
            res.render('admin/empresa/empresas', {
                pageTitle: 'Soluções',
                path: "admin/empresas",
                robotsFollow: false,
                errorMessage: [],
                empresas,
                form: false
            });
        })
        .catch(err => next(err, 500))
}

exports.getEmpresa = (req, res, next) => {
    Empresa.findOne({
            _id: req.params.id
        })
        .then(empresa => {
            if( !empresa ){
                res.redirect('/admin/empresas')
            }
            res.render('admin/empresa/empresa', {
                pageTitle: 'Empresa',
                path: "admin/empresas",
                robotsFollow: false,
                errorMessage: [],
                empresa,
                form: false
            });
        })
        .catch(err => next(err, 500))
}

exports.getSolicitacoes = (req, res, next) => {
    Empresa.find({
            status: 'pendente'
        })
        .then(empresas => {
            res.render('admin/empresa/solicitacoes', {
                pageTitle: 'Solicitações de Empresas',
                path: "admin/empresas",
                robotsFollow: false,
                errorMessage: [],
                empresas,
                form: false
            });
        })
        .catch(err => next(err, 500))
}

exports.getEditEmpresa = (req, res, next) => {
    res.render('admin/empresa/editar', {
        pageTitle: 'Editar soluçao',
        path: "admin/empresas",
        robotsFollow: false,
        errorMessage: [],
        form: false
    });
}

exports.getNewEmpresa = (req, res, next) => {
    res.render('admin/empresa/nova', {
        pageTitle: 'Nova empresa',
        path: "admin/empresas",
        robotsFollow: false,
        errorMessage: [],
        form: false
    });
}

exports.postEditEmpresa = (req, res, next) => {
    res.render('admin/empresa/editar', {
        pageTitle: 'Editar soluçao',
        path: "admin/empresas",
        robotsFollow: false,
        errorMessage: [],
        form: false
    });
}

exports.postNewEmpresa = (req, res, next) => {
    new Empresa({
        ...req.body,
        status: 'aprovado'
    })
    .save()
    .then( empresa => {
        res.redirect('/admin/empresas')
    })
    .catch( err => next(err, 500));
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

            empresa.status = 'aprovado';
            empresa.save()
            .then( empresa => {
                Solucao.find({ empresaId:empresa})
                .then( solucoes => {
                    return solucoes.forEach( solucao => {
                        solucao.status = 'pendente';
                        solucao.save();
                    });
                })
                .then( resul => {
                    transporter.sendMail({
                        to: empresa.email,
                        from: 'embrapasolucoes@gmail.com',
                        subject: 'Sua empresa foi aprovada no Embrapa Soluções!',
                        html: `
                            <h3> Oi ${empresa.encarregado}, estamos entrando em contato porque sua solicitação de cadastro foi aceita! </h3>
                            <h4> Segue os seu login para ter acesso ao sistema e cadastrar suas soluções: </h4>
                            <p> Usuário: ${empresa.usuario} </p>
                            <p> Senha: ${ empresa.senha }</p>
                            <h4> Agora basta acessar nosso site, clicar em tenho uma conta e fazer o login! Qualquer dúvida estamos a disposição :) </h4>
                        `
                    })
                    .then( resul => {

                        res.redirect('/admin/empresas/solicitacoes') 
                    })
                    .catch( err => next(err, 500))
                })
                .catch( err => nex(err, 500));
            })
            .catch( err => next(err, 500))
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
            .then( empresa => res.redirect('/admin/empresas/solicitacoes') )
            .catch( err => next(err, 500))
        })

        .catch(err => next(err));
}