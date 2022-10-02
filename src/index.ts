import 'reflect-metadata';
import express, { Express } from 'express';
import { useExpressServer, useContainer as routingContainer, Action } from 'routing-controllers';
import * as http from 'http';
import Container from 'typedi';
import * as bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
import { ENV_CONFIG } from './config/app/config';
import AppDataSource from './config/db/config';
import { tokenVerification } from './utils/jwt';
import { CustomErrorHandler } from './middlewares/errorHandler';
import { FinalMiddleware } from './middlewares/finallMiddleware';

const App: Express = express();
const baseDir = __dirname;

routingContainer(Container);
// DB configuration
AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))
// Loads all the Controllers from the directories and provides the routing facility

useExpressServer(App, {
  defaultErrorHandler: false,
  middlewares: [CustomErrorHandler, FinalMiddleware],
  authorizationChecker: async (action: Action) => {
    const token = action.request.headers[process.env.HEADER_JWT];
    if (!token){
      return false;
    }
    const BearerToken = token.split(' ');
    if (BearerToken[0] !== process.env.MAGIC_WORD || BearerToken.length < 2) {
      return false;
    }
    const result = tokenVerification(BearerToken[1]);
    if (!result.validation){
      return false;
    }
    return true;
  },
  controllers: [baseDir + `/**/controllers/*{.js,.ts}`]
});

App.use(bodyParser.urlencoded({ extended: false }));
App.use(bodyParser.json());

const server = http.createServer(App);
server.listen(ENV_CONFIG.app.port, () => {
  console.info('Server', 'Application running on', `${ENV_CONFIG.app.hostname}:${ENV_CONFIG.app.port}`);
});

// Handling the unHandledRejection errors
process.on('unhandledRejection', (error) => {
  console.error('Server', 'unhandledRejectionError :', `${error}`);
});