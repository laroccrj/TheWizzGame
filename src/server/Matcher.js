const unMatchedUsers = []

const runMatching = () => {
  let pairUser = null
  const unmatchedUserCount = unMatchedUsers.length
  for (let i = 0; i < unmatchedUserCount; i++) {
    if (!pairUser) {
      pairUser = unMatchedUsers.shift()
    } else {
      let user = unMatchedUsers.shift()

      user.sendPairNotification(pairUser)
      pairUser.sendPairNotification(user)

      pairUser = null
    }
  }

  if (pairUser) {
    unMatchedUsers.push(pairUser)
  }
}

module.exports = {
  addUserToPool: user => {
    unMatchedUsers.push(user)
    runMatching()
  }
}
