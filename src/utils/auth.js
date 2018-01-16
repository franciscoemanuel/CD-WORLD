import Cookies from 'js-cookie'

const authenticatedUserIdKey = 'authenticatedUserId'

export function getAuthenticatedUserId() {
  return Cookies.get(authenticatedUserIdKey)
}

export function setAuthenticatedUserId(userId) {
  return Cookies.set(authenticatedUserIdKey, userId)
}

export function removeAuthenticatedUserId() {
  return Cookies.remove(authenticatedUserIdKey)
}
