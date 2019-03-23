const Admin = require('../../models/admin');
const Empresa = require('../../models/empresa');
transporter = require('../../util/email-transporter')();

exports.getAdminlogin = (req, res, next) => {
    if (!req.user) {
        return res.render('admin/login', {
            pageTitle: 'Login',
            path: '/admin/login',
            form: null,
            errorMessage: req.errors,
            robotsFollow: false,
        })
    }
    return res.redirect('/');
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

            }else {
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

            if (empresa.password == form.password) {
                req.session.empresa = empresa;
                return req.session.save(err => {
                    if (err) {
                        next(err);
                    }
                    return res.redirect('/empresa');
                });

            }else {
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