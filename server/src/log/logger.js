const log4js = require('log4js')
const {resolve} = require('path')

log4js.configure({
  appenders: {
    file: {
      type: 'file',
      filename: resolve(__dirname, process.env.NODE_ENV === 'production' ? 'prod.log' : 'dev.log'),
      maxLogSize: 10 * 1024 * 1024,
      backups: 5,
      compress: true,
      encoding: 'utf-8'
    },
    out: {
      type: 'stdout'
    }
  },
  categories: {
    default: {appenders: ['file', 'out'], level: 'trace'}
  }
})

const logger = log4js.getLogger()

module.exports = logger