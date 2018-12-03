let left = 0

function setTimer(time) {
  left = time
}

function getTimer() {
  return left
}

module.exports = {
  setTimer,
  getTimer
}