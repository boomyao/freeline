const TimeBlock = 60*5
var t = 0

function reset() {
  t = Date.now()
}

function getTime() {
  return t
}

module.exports = {
  getTime,
  reset,
  TimeBlock
}