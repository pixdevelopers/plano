import winston from 'winston';
require('winston-mongodb');

module.exports = function() {
  winston.add(winston.transports.Console({colorize:true,prettyPrint:true}));
  winston.add(winston.transports.File,{filename:'serverLog.log'});
  winston.add(winston.transports.MongoDB,{db:'mongodb://localhost/plano',level:'error'});
};
