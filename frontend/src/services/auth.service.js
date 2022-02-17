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
    return {}
  }
}

const isLoggedIn = () => {
  const user = getUser()
  return Object.keys(user).length !== 0;
}

export default {
  setUser,
  getUser,
  isLoggedIn
};