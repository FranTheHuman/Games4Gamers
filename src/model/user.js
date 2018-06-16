const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    Local: {    
        username: String,
        email: String,
        password: String,
        create_at: {
            type: Date,
            default: Date.now 
        },
        admin: false,
        last_login: {
            type: Date,
            default: Date.now
        },
        avatar: String,
        gamesFav: [{
            type: schema.Types.ObjectId,
            ref: 'Games'
        }],
        gamesComprados: [{
            type: schema.Types.ObjectId,
            ref: 'Games'
        }]
    }
})

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

UserSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.Local.password);
}

module.exports = mongoose.model('User', UserSchema);