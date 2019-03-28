const Admin = require('../../models/admin');
const Empresa = require('../../models/empresa');
transporter = require('../../util/email-transporter')();

exports.getAdminlogin = (req, res, next) => {
    if (!req.session.admin) {
        return res.render('admin/login', {
            pageTitle: 'Login',
            path: '/admin/login',
            form: null,
            errorMessage: req.errors,
            robotsFollow: false,
        })
    }
    return res.redirect('/admin');
}

exports.getEmpresaLogin = (req, res, next) => {
    if (!req.session.empresa) {
        return res.render('empresa/login', {
            pageTitle: 'Login',
            path: '/admin/login',
            form: null,
            errorMessage: req.errors,
            robotsFollow: false,
        })
    }
    return res.redirect('/empresa');
}

exports.postLoginAdmin = (req, res, next) => {
    const form = {
        ...req.body
    };

    Admin.findOne({
            usuario: form.usuario
        })
        .then(admin => {
            if (!admin) {
                return res
                    .status(422)
                    .render('admin/login', {
                        path: '/login',
                        pageTitle: 'Login',
                        errorMessage: ["Usuário não encontrado!"],
                        form: {
                            values: {
                                email: '',
                                password: ''
                            },
                            hasError: ['email']
                        },
                        robotsFollow: false,
                    })
            }

            if (admin.password == form.password) {
                req.session.admin = admin;
                return req.session.save(err => {
                    if (err) {
                        next(err);
                    }
                    return res.redirect('/admin');
                });

            } else {
                return res
                    .status(422)
                    .render('admin/login', {
                        path: '/login',
                        pageTitle: 'Login',
                        errorMessage: ["Senha inválida!"],
                        form: {
                            values: {
                                usuario: form.usuario
                            },
                            hasError: ['password']
                        },
                        robotsFollow: false,
                    })
            }

        })
        .catch(err => console.log(err));
}


exports.postLoginEmpresa = (req, res, next) => {
    const form = {
        ...req.body
    };

    Empresa.findOne({
            usuario: form.usuario
        })
        .then(empresa => {
            if (!empresa) {
                return res
                    .status(422)
                    .render('empresa/login', {
                        path: '/login',
                        pageTitle: 'Login',
                        errorMessage: ["Usuário não encontrado!"],
                        form: {
                            values: {
                                email: '',
                                password: ''
                            },
                            hasError: ['email']
                        },
                        robotsFollow: false,
                    })
            }

            if (empresa.status != 'aprovado') {
                return res
                    .status(422)
                    .render('empresa/login', {
                        path: '/login',
                        pageTitle: 'Login',
                        errorMessage: ["Encontramos sua conta mas parece que ela não foi aprovada, contante o admnistrador do sistema!"],
                        form: {
                            values: {
                                email: '',
                                password: ''
                            },
                            hasError: ['email']
                        },
                        robotsFollow: false,
                    })
            }

            if (empresa.password == form.password) {
                req.session.empresa = empresa;
                return req.session.save(err => {
                    if (err) {
                        next(err);
                    }
                    return res.redirect('/empresa');
                });
                
            } else {
                return res
                    .status(422)
                    .render('empresa/login', {
                        path: '/login',
                        pageTitle: 'Login',
                        errorMessage: ["Senha inválida!"],
                        form: {
                            values: {
                                usuario: form.usuario
                            },
                            hasError: ['password']
                        },
                        robotsFollow: false,
                    })
            }

        })
        .catch(err => console.log(err));
}


exports.postLogout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
}