import express from 'express';
require('express-async-errors');
import error from './middlewares/error';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from 'config';
import multer from 'multer';
//import helmet from 'helmet';
//import checkJwt from './middlewares/jwt';
import routes from './routes/routes';
//process.env.NODE_CONFIG_DIR = './src/config';
if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}
//dotenv.load();
const app = express();
require('./startup/db')();
//app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(checkJwt);
app.use('/', routes);
app.use(error);

const server = app.listen(process.env.PORT || 3000, () => {
  const { port } = server.address();

  console.log('Listening on port', port);
});

module.exports = server;

//NODE_ENVE=test
