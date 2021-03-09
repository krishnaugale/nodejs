require('winston-daily-rotate-file')
const winston = require('winston')
const fecha = require('fecha').format
const { createLogger, format, transports } = winston
const { combine, timestamp } = format

const myFormat = format.printf(({ message }) => {
  const funName = message.funName || ''
  const date = fecha(new Date(), 'YYYY-MM-DD HH:mm:ss.SSS')
  const state = message.state || 'SUCCESS'
  const request =
    Buffer.from(JSON.stringify(message.req)).toString('base64') || ''
  const response = Buffer.from(JSON.stringify(message.res)).toString('base64')

  let finalLog = `${
    date + '|~|' + funName + '|~|' + request + '|~|' + state + '|~|' + response
  }`
  return finalLog
})

const myCustomLevels = {
  levels: {
    fl: 0,
    con: 1,
  },
  colors: {
    fl: 'green',
    con: 'blue',
  },
}

const logger = createLogger({
  levels: myCustomLevels.levels,
  transports: [
    new transports.DailyRotateFile({
      filename: 'logger' + '/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'fl',
      format: combine(timestamp({ format: 'DD-MM-YYYY' }), myFormat),
    }),
  ],
})

//
// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  )
}

module.exports = { logger }
