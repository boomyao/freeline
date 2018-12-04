const db = require('./db/index')
const {
  getTime,
  TimeBlock,
  reset
} = require('./timer')
const nanoid = require('nanoid')

function getLine() {
  const line = db.get('lines').first().value()
  const nodes = line.nodes.map(node => ({
    id: node.id,
    content: node.content,
    created: node.created,
    likeCount: node.like.length,
    unlinkCount: node.unlike.length
  }))
  return {
    line: {
      id: line.id,
      title: line.title,
      nodes
    },
    time: getTime()
  }
}

function addNode(content) {
  if (Date.now() - getTime() < TimeBlock * 1000) return
  const node = {
    id: nanoid(8),
    content,
    created: Date.now(),
    like: [],
    unlike: []
  }
  db.get('lines').first()
    .get('nodes')
    .push(node)
    .write()
  reset()
  return node
}

function vote(nid, uid, isLike) {
  const node = db.get('lines').first()
    .get('nodes')
    .find({
      id: nid
    })

  const like = node.get('like')
  const unlike = node.get('unlike')

  if (like.indexOf(uid).value() > -1 || unlike.indexOf(uid).value() > -1) return

  if (isLike) {
    like.push(uid)
      .write()
  } else {
    unlike
      .push(uid)
      .write()
  }
}

module.exports = {
  getLine,
  addNode,
  vote
}