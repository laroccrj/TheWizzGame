const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const uuidv4 = require('uuid/v4')
const Matcher = require('./Matcher')

// var GameController = require('#/Domain/Game/GameController')

const users = []

io.on('connection', function(socket) {
  console.log('a user connected')
  createUser(socket)

  socket.on('disconnect', function() {
    console.log('user disconnected')
  })

  socket.on('move_forward', function() {
    console.log('move forward')
  })
})

http.listen(3000, function() {
  console.log('listening on *:3000')
})

const createUser = socket => {
  const user = getUserObject(socket, uuidv4())
  addUserToMasterList(user)
  Matcher.addUserToPool(user)
  return user
}

const addUserToMasterList = user => {
  users.push(user)
}

const getUserObject = (socket, id) => ({
  id: id,
  socket: socket,
  sendPairNotification: pairUser => {
    console.log(`${id} paired with ${pairUser.id}`)
    socket.send({
      id: id,
      pair: pairUser.id
    })
  }
})
