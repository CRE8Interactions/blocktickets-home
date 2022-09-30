const setUser = (userObj) => {
  let user = JSON.stringify(userObj)
  sessionStorage.setItem('user', user)
}

const setPermissions = (permissionsObj) => {
  let permissions = JSON.stringify(permissionsObj)
  sessionStorage.setItem('permissions', permissions)
}

const getPermissions = () => {
  let permissions = sessionStorage.getItem('permissions')
  permissions = JSON.parse(permissions)
  if (permissions) {
    return permissions
  } else {
    return undefined
  }
}

const setOrg = (orgObj) => {
  let org = JSON.stringify(orgObj)
  sessionStorage.setItem('org', org)
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

const setSignUpToken = (jwt) => {
  let token = JSON.stringify(jwt)
  sessionStorage.setItem('signup-token', token)
} 

const getSignUpToken = () => {
  let user = sessionStorage.getItem('signup-token')
  user = JSON.parse(user)
  if (user) {
    return user
  } else {
    return undefined
  }
}

const getOrg = () => {
  let org = sessionStorage.getItem('org')
  org = JSON.parse(org)
  if (org) {
    return org
  } else {
    return undefined
  }
}

const token = () => {
  const user = getUser()
  if (user) {
    return user.jwt
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
  sessionStorage.removeItem('org')
  sessionStorage.removeItem('permissions')
}

const removeSignup = () => {
  sessionStorage.removeItem('signup-token')
}

const isOrganizer = () => {
  const jwt = getUser()
  if (!jwt) return false
  return jwt.user.role.name === 'Organizer';
}

const atts = {
  setUser,
  setSignUpToken,
  setOrg,
  getUser,
  getSignUpToken,
  getOrg,
  isLoggedIn,
  removeSignup,
  logoutUser,
  token,
  isOrganizer,
  setPermissions,
  getPermissions
}

export default atts