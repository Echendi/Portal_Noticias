const { Passport } = require('passport');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const db = require('../util/database')
const helpers = require('../lib/helpers');
const { loginUser, loginId, insertPerson, insertUser } = require("../util/queries");

passport.use('local.login', new LocalStrategy({
    usernameField: 'user',                                // Nombre del campo  convertir a constante
    passwordsField: 'password',                          // Nombre del campo  convertir a constante
    passReqToCallback: true
}, async (req, username, password, done) => {
    const rows = await db.query(loginUser, [username]);
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password);
        if (validPassword) {
            return done(null, user);
        } else {
            return done('Contraseña inválida');                            // Modificar para la vista
        }
    } else {
        return done('El usuario no existe');                              // Modificar para la vista
    }
}));



passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const rows = await db.query(loginId, [id]);
    done(null, rows[0]);
});