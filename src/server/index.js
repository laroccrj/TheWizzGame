/*const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 2345 })


  We will need to add more actions later but the main functions we need are
  - Handling connections and pairing users
  - Posting moves back and forth

  Connections will open and post a CONNECT request
    - {type: CONNECT, username: Player 1}
  Server should respond with notification when users are paired

  Users will send ACTION requests to post their moves to opponent
    - {type: ACTION, move: (ROTATE_LEFT|ROTATE_RIGHT|FORWARD|CAST)}
  Server should respond with the validity of the action and post move to opponent
wss.on('connection', ws => {
  ws.on('message', message => {
    const json = JSON.parse(message)
    switch (json.type) {
      case 'CONNECT':
        console.log('connect')
        break

      case 'ACTION':
        console.log('action')
        break

      default:
        break
    }
  })

  ws.on('close', () => {
    // TODO handle disconnects
  })
})
*/

var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

// Commmented out for now - we'll have to figure something out in order to reuse code
// var GameController = require('../client/Domain/Game/GameController')

io.on('connection', function(socket) {
  console.log('a user connected')
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

//console.log('Server running on port 2345')
