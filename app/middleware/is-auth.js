const Admin = require('../models/admin');
const Empresa = require('../models/empresa');

exports.admin = (req, res, next) => {
    
    if (req.session.admin) {
        Admin.findById(req.session.admin)
            .then(admin => {
                req.admin = admin;
                next();
            })
            .catch(err => console.log(err));
    } else {
        req.admin = null;
        return res.redirect('/admin/login');
    }

}

exports.empresa = (req, res, next) => {
    
    if (req.session.empresa) {
        Empresa.findById(req.session.empresa)
            .then(empresa => {
                req.empresa = empresa;
                next();
            })
            .catch(err => console.log(err));
    } else {
        req.empresa = null;
        return res.redirect('/login');
    }

}

exports.both = (req, res, next) => {
    
    if (req.session.empresa) {
        req.admin = null;
        Empresa.findById(req.session.empresa)
            .then(empresa => {
                req.empresa = empresa;
                next();
            })
            .catch(err => console.log(err));

    } else if (req.session.admin) {
        req.empresa = null;
        Admin.findById(req.session.admin)
            .then(admin => {
                req.admin = admin;
                next();
            })
            .catch(err => console.log(err));
    } else {
        req.admin = null;
        req.empresa = null;
        return res.redirect('/empresa/login');
    }

}