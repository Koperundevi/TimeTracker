/**
 * Main Application
 */

require('./src/bootstrap');

const config = require('config');
const helmet = require('helmet');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const _ = require('lodash');
const winston = require('winston');
const httpStatus = require('http-status');
const morgan = require('morgan');
const helper = require('./src/common/helper');
const errorMiddleware = require('./src/common/ErrorMiddleware');
const routes = require('./src/routes');

const errors = require('common-errors');

const passport = require('passport');

const app = express();
const http = require('http').Server(app);
const models = require('./src/models');

app.use(cors({ origin: true, credentials: true }));
app.set('port', config.PORT);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('dev'));

require('./app-passport')(app);

models.init(false);

const apiRouter = express.Router();

// load all routes

_.each(routes, (verbs, url) => {
  _.each(verbs, (def, verb) => {
    let actions = [
      function action(req, res, next) {
        req.signature = `${def.controller}#${def.method}`;
        next();
      },
    ];
    const method = require(`./src/controllers/${def.controller}`)[def.method]; // eslint-disable-line

    if (!method) {
      throw new Error(`${def.method} is undefined, for controller ${def.controller}`);
    }
    if (def.middleware && def.middleware.length > 0) {
      actions = actions.concat(def.middleware);
    }

    // add passport middleware if route has auth
    if (def.auth) {
      actions.push((req, res, next) => {
        passport.authenticate(def.auth, (err, user) => {
          if (err || !user) {
            next(new errors.AuthenticationRequiredError(err));
          } else {
            req.logIn(user, error => next(error));
          }
        })(req, res, next);
      });

      actions.push((req, res, next) => {
        if (!req.user) {
          next(new errors.AuthenticationRequiredError('Unauthenticated'));
        }
        next();
      });
    }

    actions.push(method);
    winston.info(`API : ${verb.toLocaleUpperCase()} /api/${config.API_VERSION}${url}`);
    apiRouter[verb](`/api/${config.API_VERSION}${url}`, helper.autoWrapExpress(actions));
  });
});


app.use('/', apiRouter);
app.use(errorMiddleware());
app.use('*', (req, res) => {
  const pathKey = req.baseUrl.substring(config.API_VERSION.length + 1);
  const route = routes[pathKey];
  if (route) {
    res.status(httpStatus.METHOD_NOT_ALLOWED).json({ message: 'The requested method is not supported.' });
  } else {
    res.status(httpStatus.NOT_FOUND).json({ message: 'The requested resource cannot found.' });
  }
});


http.listen(app.get('port'), () => {
  winston.info(`Express server listening on port ${app.get('port')}`);
});

module.exports = app;
