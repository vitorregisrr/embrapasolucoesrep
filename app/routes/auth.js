const express = require('express'),
    router = express.Router();

const validators = {
    auth: require('../middleware/validators/auth')
}

const authCtrl = {
    changePass: require('../controllers/auth/changepass'),
    resetPass: require('../controllers/auth/resetpass'),
    login: require('../controllers/auth/login')
}

//LOGIN
    //GET
    router.get('/admin/login', setLocals, authCtrl.login.getAdminlogin);
    //POST ADMIN
    router.post('/admin/login', setLocals, validators.auth.login, authCtrl.login.postLoginAdmin);

//LOGOUT
router.get('/logout', setLocals, authCtrl.login.postLogout);

//CHANGE PASSWORD
    //GET
    router.get('/changepassword', setLocals, authCtrl.changePass.getChangePass);
    //POST ADMIN
    router.post('/changepassword', setLocals, validators.auth.resetPassword, authCtrl.changePass.postChangePassAdmin);

//REQUEST RESET PASSWORD
    //GET
    router.get('/resetpassword', setLocals, authCtrl.resetPass.getResetPassword);
    //POST ADMIN
    router.post('/resetpassword', setLocals, authCtrl.resetPass.postResetPasswordAdmin);

//RESET PASSWORD
    //GET
    router.get('/newpassword/:passwordToken', setLocals, authCtrl.resetPass.getNewPassword);
    //POST ADMIN
    router.post('/newpassword', validators.auth.resetPassword, setLocals, authCtrl.resetPass.postNewPasswordAdmin);

module.exports = router;