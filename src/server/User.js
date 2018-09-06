const Matcher = require('./Matcher')
const uuidv4 = require('uuid/v4')

const users = []

module.exports = {
  createUser: socket => {
    const user = getUserObject(socket, uuidv4())
    addUserToMasterList(user)
    Matcher.addUserToPool(user)
    return user
  }
}

const addUserToMasterList = user => {
  users.push(user)
}

const getUserObject = socket => {
  const userId = uuidv4()
  return {
    id: userId,
    socket: socket,
    sendPairNotification: pairUser => {
      console.log(`${userId} paired with ${pairUser.id}`)
      socket.send({
        id: userId,
        pair: pairUser.id
      })
    }
  }
}
