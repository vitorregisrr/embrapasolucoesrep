const Solucao = require('../../models/solucao'),
    Empresa = require('../../models/empresa'),
    Avaliacao = require('../../models/avaliacao'),
    transporter = require('../../util/email-transporter')(),
    queryHelper = require('../../util/query-filter'),
    cloudinary = require('../../util/cloudinary');

exports.getEdit = (req, res, next) => {
    res.render('empresa/empresa/editar', {
        pageTitle: 'Perfil da empresa',
        path: "empresa/editar",
        robotsFollow: false,
        errorMessage: [],
        empresa: req.empresa,
        form: false,
        empresa: req.empresa
    });
}

exports.postEdit = (req, res, next) => {

    Empresa.findOne({
            _id: req.empresa._id
        })
        .then(empresa => {

            if (!empresa) {
                return next(new Error('Houve um erro e a solução não foi encontrada, volte e tente novamente.'));
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

                                empresa.image = image;
                                empresa.nome = req.body.nome;
                                empresa.encarregado = req.body.encarregado;
                                empresa.email = req.body.email;
                                empresa.telefone = req.body.telefone;

                                empresa.save();
                                return res.redirect('/empresa/editar')
                            })
                            .catch(err => next(err))
                    })
                    .catch(err => next(err));
            } else {

                empresa.nome = req.body.nome;
                empresa.encarregado = req.body.encarregado;
                empresa.email = req.body.email;
                empresa.telefone = req.body.telefone;

                empresa.save();
                return res.redirect('/empresa/editar')
            }
        })
        .catch(err => next(err));
}