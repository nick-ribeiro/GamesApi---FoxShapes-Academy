var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/usersRoute');
var levelsRouter = require('./routes/levelsRoute');
var achivementsRouter = require('./routes/achivementsRoute');
var progressRouter = require('./routes/progressRoute');
var configurationsRouter = require('./routes/configurationsRoute');
var feedbacksRouter = require('./routes/feedbacksRoute');

var app = express();

// Importa o sequelize (conexão com o banco de dados)
const sequelize = require('./config/database');

// Testa a conexão com o banco de dados
sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    })
    .catch(err => {
        console.error('Não foi possível conectar ao banco de dados:', err);
    });

// Sincroniza os modelos com o banco de dados (cria as tabelas se não existirem)
sequelize.sync()
    .then(() => {
        console.log('Sincronização com o banco de dados concluída.');
    })
    .catch(err => {
        console.error('Erro ao sincronizar o banco de dados:', err);
    });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/levels', levelsRouter);
app.use('/achivements', achivementsRouter);
app.use('/progress', progressRouter);
app.use('/configurations', configurationsRouter);
app.use('/feedbacks', feedbacksRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
