exports.postAvaliacao = (req, res, next) => {
    res.render('public/home', {
        pageTitle: '',
        path: "/",
        robotsFollow: false,
        errorMessage: [],
        form: false
    })
}