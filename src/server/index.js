const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 2345 })

/*
  We will need to add more actions later but the main functions we need are
  - Handling connections and pairing users
  - Posting moves back and forth

  Connections will open and post a CONNECT request
    - {type: CONNECT, username: Player 1}
  Server should respond with notification when users are paired

  Users will send ACTION requests to post their moves to opponent
    - {type: ACTION, move: (ROTATE_LEFT|ROTATE_RIGHT|FORWARD|CAST)}
  Server should respond with the validity of the action and post move to opponent */
wss.on('connection', ws => {
  ws.on('message', message => {
    const json = JSON.parse(message)
    switch (json.type) {
      case 'CONNECT':
        // TODO Users should be able to pair up for games
        break

      case 'ACTION':
        // TODO Users should be able to post moves to their opponent
        break

      default:
        break
    }
  })

  ws.on('close', () => {
    // TODO handle disconnects
  })
})

console.log('Server running on port 2345')
