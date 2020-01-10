const {createLogger, format, transports} = require('winston');
const {combine, timestamp, label, prettyPrint} = format;
// const dateFormat = require('dateformat');
require('winston-daily-rotate-file');

const createTransports = (config) => {
  const customTransports = [];
  if (config.path) {
    // let date = dateFormat(new Date(), "yyyy-mm-dd");
    customTransports.push(
      // new transports.File({
      //     filename: `${config.path}/logs_${date}.log`,
      //     level: config.level,
      //     format: format.json()
      // }),
      new transports.DailyRotateFile({
        filename: config.path,
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        format: format.json(),
        maxSize: '10mb',
        maxFiles: '31d'
      })
    );
  }
  if (config.console) {
    customTransports.push(
      new transports.Console({
        level: config.level,
        format: format.combine(
          format.colorize(),
          format.simple()
        )
      })
    );
  }
  return customTransports;
};

module.exports = {
  create: (config) => {
    return createLogger({
        transports: createTransports(config),
        format: combine(
          timestamp(),
          prettyPrint()
        )
    });
  }
};