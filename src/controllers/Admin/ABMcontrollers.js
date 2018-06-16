const Games = require('../../model/games');
const path = require('path');

const getABMgame = (req, res) => {
    
    Games.find({}, (err, games) => {
        if (err) throw err;

        res.render('ABMgames', {
            title: 'ABM GAMES',
            games
        }) 
    }) 
}

const add = (req, res) => {

                    let body = { title: req.body.title, category: req.body.categoria, price: req.body.precio}
                    Games.create(body, (err, game) => {
                        if (err) throw err; else {
                        res.redirect('/ABMcatalogo') 
                        }
                    });
}

const delet = (req, res) => {
        let id = req.params.id 
        Games.remove({_id: id}, (err, game) => {
            if (err) throw err;
            res.redirect('/ABMcatalogo') 
        })
}

const updateGamGET = async (req, res) => {
        const game = await Games.findById(req.params.id);
        console.log(game)
        res.render('edit', { game });
}

const  updateGamPOST = async (req, res) => {
    const { id } = req.params;
    let body = { title: req.body.title, category: req.body.categoria, price: req.body.precio}
    await Games.update({_id: id}, body);
    res.redirect('/ABMcatalogo');
}

const turnStock = (req, res) => {
    let id = req.params.id 
    Games.findById(id, (err, game) => { 
        if (err) throw err;

        game.stock = !game.stock
        game.save()
            .then(() => res.redirect('/ABMcatalogo')) 
    })
}

module.exports = {
    getABMgame,
    add,
    delet,
    turnStock,
    updateGamGET,
    updateGamPOST
}