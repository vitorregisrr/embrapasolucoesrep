exports.getIndex = (req, res, next) => {
    res.render('public/home', {
        pageTitle: '',
        path: "/",
        robotsFollow: false,
        errorMessage: []
    })
}

exports.getSubmeter = (req, res, next) => {
    res.render('public/submeter', {
        pageTitle: '',
        path: "/",
        robotsFollow: false,
        errorMessage: []
    })
}