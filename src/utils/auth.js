import ls from 'local-storage'

const USER_KEY = 'user'

export function getUserFromLocalStorage() {
  return ls.get(USER_KEY)
}

export function setLocalStorageUser(user) {
  return ls.set(USER_KEY, user)
}

export function removeUserFromLocalStorage() {
  return ls.remove(USER_KEY)
}
