const winston = require("winston");
require("winston-daily-rotate-file");
const { createLogger, format, transports } = require("winston");
const { combine, timestamp } = format;

const logFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

// const myFormat = printf(({ message }) => {
//   var t = ''
//   for (const name of Object.keys(message)) {
//     // console.log(`${name} : ${message[name]} `);
//     t += message[name] + '|~|'
//     t += message[name] + '|~|'

//   }
//   return `|**|${t}`
// })
const myCustomLevels = {
  levels: {
    fl: 0,
    con: 1,
  },
  colors: {
    fl: "green",
    con: "blue",
  },
};
const logger = createLogger({
  levels: myCustomLevels.levels,
  transports: [
    new transports.DailyRotateFile({
      filename: "logger" + "/application-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
      level: "fl",
      format: logFormat
    }),
  ],
});

const logs = createLogger({
  transports: [
    new transports.Console({
      level: "info",
      format: combine(
        timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
        format.printf(({ message, timestamp }) => {
          if (typeof message == "object") {
            // message=JSON.stringify(message);
            return `${timestamp} ${message.stack}`;
          }
          return `${timestamp} ${process.pid} ${message}`;
        })
      ),
    }),
  ],
});

module.exports = logger;
