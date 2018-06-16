const getlogin = (req, res) => {
    res.render('loginADM',{
        message: req.flash('loginMessage'),
        title: "Admin Login"
     })
}
const getsignup = (req, res) => {
    res.render('signupADM', {
        message: req.flash('signupMessage'),
        title: 'Admin SignUp'
    })
}
const postlogin = {
    successRedirect: '/HomeAdmin',
    failureRedirect: '/loginAdm',
    failureFlash: true
}
const postsignup = {
    successRedirect: '/HomeAdmin',
    failureRedirect: '/signupAdm',
    failureFlash: true
}

const SamePassword = (req, res, next) => {
    if(req.body.password == req.body.password2){
        return next();
    }
    return res.redirect('/signupAdm')
    req.flash('signupmessage', 'Not the same password')
}

module.exports = {
    getlogin,
    getsignup,
    postlogin,
    postsignup,
    SamePassword
}