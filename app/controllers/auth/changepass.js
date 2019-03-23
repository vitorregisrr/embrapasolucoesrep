const Empresa = require('../../models/empresa');
const Admin = require('../../models/admin');

exports.getChangePass = (req, res, next) => {
    res.render('admin/auth/trocarsenha', {
        path: '/trocarsenha',
        pageTitle: 'Resetar senha',
        errorMessage: req.flash('error'),
        form: null,
        robotsFollow: false,
    });
}

exports.postChangePassAdmin = (req, res, next) => {
    Admin.findOne()
    .then( user => {
        if(user.password == req.body.currentpassword){
            
        }
    })
    .catch( err => next(err));
}

exports.postChangePassEmpresa= (req, res, next) => {
    Empresa.findOne()
    .then( user => {
        if(user.password == req.body.currentpassword){
            
        }
    })
    .catch( err => next(err));
}