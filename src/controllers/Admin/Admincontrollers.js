const users = require('../../model/user');
const Games = require('../../model/games');

function isAdminloggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        if(req.user.Local.admin){
            return next()
        }
    }
    return res.redirect('/')
}

const getHome = (req,res) => { res.render('homeADMIN', { title: 'Home', user: req.user})}

const getprofileA = (req, res) => {
    res.render('admin', {
        user: req.user,
        title: "User/Admin"
    })
}

const getUsers = (req, res) => {
    let perPage = 6;
    let page = req.params.page || 1;
    let usuario = req.user

        users
           .find({}) 
           .skip((perPage * page) - perPage) 
           .limit(perPage) 
           .exec((err, user) => {
            users.count((err, count) => {
                if (err) return next(err);

                res.render('clientes', {
                    title: "Users",
                    users : user,
                    usuario,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
} // <img src="<%= users[i].Local.avatar %>" class="card-img-top">

const delet = (req, res) => {
    let id = req.params.id 
    users.remove({_id: id}, (err, users) => {
        if (err) throw err;
        res.redirect('/clients') 
    })
}

const catalogo = (req, res, next) => {
    let perPage = 6;
    let page = req.params.page || 1;

        Games
           .find({}) 
           .skip((perPage * page) - perPage) 
           .limit(perPage)
           .exec((err, games) => {
            Games.count((err, count) => {
                if (err) return next(err);
                res.render('adminCatalogo', {
                    title: "Games",
                    user: req.user,
                    games,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
    
}

module.exports = {
    getHome,
    isAdminloggedIn,
    getprofileA,
    getUsers,
    delet,
    catalogo
}