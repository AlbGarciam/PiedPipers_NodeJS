/* eslint-disable no-console */
import 'dotenv/config';
import http from 'http';
import cluster from 'cluster';
import { cpus } from 'os';
import { ServerPort } from '../utils';
import app from '../app';

const workers = [];
const port = ServerPort();

/**
 * Setup number of worker processes to share port which will be defined while setting up server
 */
const setupWorkerProcesses = () => {
  const numCores = cpus().length;
  console.debug(`Master cluster setting up ${numCores} workers`);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < numCores; i++) {
    workers.push(cluster.fork());
    workers[i].on('message', message => {
      console.debug(message);
    });
  }

  // process is clustered on a core and process id is assigned
  cluster.on('online', worker => {
    console.debug(`Worker ${worker.process.pid} is listening`);
  });

  // if any of the worker process dies then start a new one by simply forking another one
  cluster.on('exit', (worker, code, signal) => {
    console.debug(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
    console.debug('Starting a new worker');
    cluster.fork();
    workers.push(cluster.fork());
    // to receive messages from worker process
    workers[workers.length - 1].on('message', message => {
      console.debug(message);
    });
  });
};

/**
 * Setup an express server and define port to listen all incoming requests for this application
 */
const setUpExpress = () => {
  app.set('port', port);
  // create server
  app.server = http.createServer(app);
  // start server
  app.server.listen(port, () => {
    console.debug(
      `Started server on => http://localhost:${app.server.address().port} for Process Id ${
        process.pid
      }`
    );
  });

  // in case of an error
  app.on('error', (appErr, appCtx) => {
    console.error('app error', appErr.stack);
    console.error('on url', appCtx.req.url);
    console.error('with headers', appCtx.req.headers);
  });
};

const setupServer = isClusterRequired =>
  isClusterRequired && cluster.isMaster ? setupWorkerProcesses() : setUpExpress();

setupServer(true);

export default app;
