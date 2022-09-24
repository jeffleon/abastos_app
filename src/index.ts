import 'reflect-metadata';
import cors from "cors";
import express, { Express } from 'express';
import { useExpressServer, useContainer as routingContainer } from 'routing-controllers';
import * as http from 'http';
import Container from 'typedi';
import * as bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
import { ENV_CONFIG } from './config';

const App: Express = express();
const baseDir = __dirname;

routingContainer(Container);

// Loads all the Controllers from the directories and provides the routing facility
useExpressServer(App, {
  routePrefix: ENV_CONFIG.app.apiRoot,
  defaultErrorHandler: false,
  controllers: [baseDir + `/**/controllers/*{.js,.ts}`]
});

App.use(cors);
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