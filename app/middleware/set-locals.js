module.exports = (req, res, next) => {
    //setting locals
    res.locals.csrfToken = req.csrfToken();
    next();
};