const Games = require('../../model/games');
const Users = require('../../model/user');

const getcatalog = (req, res, next) => {
    let perPage = 6;
    let page = req.params.page || 1;
    
        Games
           .find({}) // finding all games
           .skip((perPage * page) - perPage) // nos saltamos las paginas cada 6 items
           .limit(perPage) // ¿cuantas paginas quieres renderizar en las vistas? 
           .exec((err, games) => {
            Games.count((err, count) => { // count para calcular el numero de aginas
                if (err) return next(err);
                res.render('gamesCata', {
                    title: "Games",
                    user : req.user,
                    games,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
}

const getgame = (req, res) => {
    let id = req.params.id;
    Games.findById(id, (err, game) => { 
        if (err) throw err;

        res.render('game',{
            title: 'Game: ' + game.title,
            game : game
        }) 
    })
}

const gethome = (req, res) => {
    res.render('home', { title: 'Home', user: req.user});
}

function isloggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    return res.redirect('/')
}

const getprofile = (req, res) => {
    res.render('user', {
        user: req.user,
        title: "User"
    })
}

module.exports = {
    getcatalog,
    gethome,
    isloggedIn,
    getprofile,
    getgame
}