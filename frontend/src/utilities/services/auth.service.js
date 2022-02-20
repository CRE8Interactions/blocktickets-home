const setUser = (userObj) => {
  let user = JSON.stringify(userObj)
  sessionStorage.setItem('user', user)
}

const getUser = () => {
  let user = sessionStorage.getItem('user')
  user = JSON.parse(user)
  if (user) {
    return user
  } else {
    return undefined
  }
}

const isLoggedIn = () => {
  const user = getUser()
  if (!user) return false
  return Object.keys(user).length !== 0;
}

const logoutUser = () => {
  sessionStorage.removeItem('user')
}

export default {
  setUser,
  getUser,
  isLoggedIn,
  logoutUser
};