const express = require('express');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const express_session = require('express-session');
const fs = require('fs');

// Constantes
const PORT=  8080;

// Initializaciones
const app = express();
require('./lib/passport');

// Configuraciones
app.set('port', process.env.PORT || PORT);

// middlewares
/* app.use(morgan(':method :url :status :date')); */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express_session({ secret: 'SECRET' })); // Sesión secreta
app.use(passport.initialize());
app.use(passport.session()); // Inicio de sesión Persistente

// Configurando el logger
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan(':method :url :status :date', { stream: accessLogStream }))

// Variables Globales 
app.use((req, res, next) => {
    app.locals.user = req.user;
    next();
});

// Rutas
/* app.use(require('./routes')); */
app.use('/authentication',require('./routes/authentication'));
app.use('/log',require('./routes/log'));
app.use('/news',require('./routes/news'));
app.use('/weather',require('./routes/weather'));

// Publico
app.use(express.static(path.join(__dirname, 'public')));

// Iniciando servidor
app.listen(app.get('port'), () => {
    console.log('Server on port ' + app.get('port'));
});