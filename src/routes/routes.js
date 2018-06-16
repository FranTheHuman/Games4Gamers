const contr = require('../controllers/Clientes/Authcontrollers');
const contr2 = require('../controllers/Clientes/Clientcontrollers');

const contrA = require('../controllers/Admin/Authcontrollers');
const contrA2 = require('../controllers/Admin/Admincontrollers');
const contrABM = require('../controllers/Admin/ABMcontrollers');

module.exports = (app, passport) => {
    
    // Autenticacion Cliente
    app.get('/', contr.index);
    app.get('/login', contr.getlogin);
    app.post('/login', passport.authenticate('local-login',contr.postlogin));
    app.get('/signup', contr.getsignup);
    app.post('/signup', contr.SamePassword, passport.authenticate('local-signup',contr.postsignup));
  
    // Cliente
    app.get('/home', contr2.isloggedIn, contr2.gethome);
    app.get('/user', contr2.isloggedIn, contr2.getprofile);
    app.get('/games/:page', contr2.isloggedIn, contr2.getcatalog);
    app.get('/fav');
    app.post('/purchase/:id');
    app.post('/deleteUser');
    app.post('/addComment');

    app.get('/game/:id', contr2.isloggedIn, contr2.getgame);

    // Autenticacion Admin
    app.get('/loginAdm', contrA.getlogin); 
    app.post('/loginAdm', passport.authenticate('local-login-Admin', contrA.postlogin));
    app.get('/signupAdm', contrA.getsignup); // solamente puede crear un admin otro admin
    app.post('/signupAdm', contrA.SamePassword, passport.authenticate('local-signup-Admin', contrA.postsignup));

    // Admin
    app.get('/HomeAdmin', contrA2.isAdminloggedIn, contrA2.getHome); 
    app.get('/admin', contrA2.isAdminloggedIn, contrA2.getprofileA);
    app.get('/catalogo/:page', contrA2.isAdminloggedIn, contrA2.catalogo);

            //ABM - GAMES
            app.get('/ABMcatalogo', contrA2.isAdminloggedIn, contrABM.getABMgame);
            app.post('/add', contrA2.isAdminloggedIn, contrABM.add);
            app.get('/delete/:id', contrA2.isAdminloggedIn, contrABM.delet);
            app.get('/turn/:id', contrA2.isAdminloggedIn, contrABM.turnStock);
            app.get('/update/:id', contrA2.isAdminloggedIn, contrABM.updateGamGET);  
            app.post('/update/:id', contrA2.isAdminloggedIn, contrABM.updateGamPOST); 
            
            // ABM - CLIENTES
            app.get('/clients', contrA2.isAdminloggedIn, contrA2.getUsers);
            app.get('/ban/:id', contrA2.isAdminloggedIn, contrA2.delet);
    
    // Cerrar usuario
    app.get('/logout', (req,res) => {
        req.logout()
        res.redirect('/')
    })




}
