const app = require("express")()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const {getLine, addNode, vote} = require('./controller')
const nanoid = require('nanoid')

app.use(cookieParser())
app.use(bodyParser.json())

app.get('/line', (req, res) => {
  if (!req.cookies['uid']) {
    const uid = nanoid(8)
    res.cookie('uid', uid, {
      maxAge: 365*24*60*60*1000,
      httpOnly: true
    })
  }
  const data = getLine()
  res.send(data)
})

app.post('/node', (req, res) => {
  const content = req.body.content
  const node = addNode(content)
  res.send(node)
})

app.post('/vote', (req, res) => {
  const distinctId = req.ip + req.cookies['uid']
  const {id, like} = req.body
  vote(id, distinctId, like)
  res.end()
})

let PORT = 3000
app.listen(PORT, () => {
  console.log(`listening to ${PORT}`)
})
