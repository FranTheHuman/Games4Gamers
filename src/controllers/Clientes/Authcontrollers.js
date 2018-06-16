const index = (req, res) => {
     res.render('index', { title: 'Games4Gamers'}) 
}
const getlogin = (req, res) => {
    res.render('login',{
        message: req.flash('loginMessage'),
        title: "Login"
     })
}
const getsignup = (req, res) => {
    res.render('signup', {
        message: req.flash('signupMessage'),
        title: 'SignUp'
    })
}
const postlogin = {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
}
const postsignup = {
    successRedirect: '/home',
    failureRedirect: '/signup',
    failureFlash: true
}

const SamePassword = (req, res, next) => {
    if(req.body.password == req.body.password2){
        return next();
    }
    return res.redirect('/signup')
    req.flash('signupmessage', 'Not the same password')
}

module.exports = {
    index,
    getlogin,
    getsignup,
    postlogin,
    postsignup,
    SamePassword
}

