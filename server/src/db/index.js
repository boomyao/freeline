const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const path = require('path')

const filename = process.env.NODE_ENV === 'production' ? 'prod.json' : 'dev.json'
const adapter = new FileSync(path.resolve(__dirname, filename))

const db = low(adapter)

db.defaults({
  lines: [
    {
      id: 1,
      title: '',
      nodes: []
    }
  ]
})
.write()

module.exports = db