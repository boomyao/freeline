const mongoose = require('mongoose')

mongoose.connect('')

const Node = mongoose.model('Node', {
  id: Number,
  content: string,
  yesCount: Number,
  noCount: Number,
  created: {type: Number, default: Date.now},
  update: {type: Number, default: Date.now}
})

const Line = mongoose.model('Line', {
  id: Number,
  title: String,
  nodes: [Node],
  created: {type: Number, default: Date.now},
  update: {type: Number, default: Date.now}
})

module.exports = {
  Line,
  Node,
}