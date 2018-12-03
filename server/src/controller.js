const {
  Line,
  Node
} = require('./db')

function addLine() {
  return new Promise((resolve, reject) => {
    const line = new Line()
    line.save((err, p) => {
      if (err) {
        reject(err)
        return
      }
      resolve(p)
    })
  })
}

function addNode2Line(id, content) {
  return new Promise(async (resolve, reject) => {
    const line = await Line.findById(id)
    
    if (!line) {
      reject('no have this line')
      return
    }

    const node = new Node()
    node.content = content
    line.nodes.push(node)

    line.save((err, item) => {
      if (err) {
        reject(err)
        return
      }
      resolve(item)
    })
  })
}

function voteNode(lid, nid, yrn) {
  return new Promise(async (resolve, reject) => {
    const line = await Line.findById(lid)

    if (!line) {
      reject('no have this line')
      return
    }

    const node = await line.nodes.findById(nid)

    if (!node) {
      reject('no have this node')
      return
    }

    if (yrn) {
      node.noCount++
    } else {
      node.yesCount++
    }

    node.save((err, item) => {
      if (err) {
        reject('save error')
        return
      }
      resolve(item)
    })
  })
}

module.exports = {
  addLine,
  addNode2Line,
  voteNode
}