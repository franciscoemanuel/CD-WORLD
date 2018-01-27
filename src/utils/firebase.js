const defaultMessage = 'Erro inesperado, tente novamente mais tarde!'

const firebaseErrors = [
  { code: 'auth/user-not-found', message: 'E-mail não cadastrado' },
  { code: 'auth/wrong-password', message: 'Senha incorreta para o e-mail digitado' },
  { code: 'auth/email-already-in-use', message: 'Este e-mail já está em uso' }
]

export function translateFirebaseErrorCodeToMessage(errorCode) {
  const mappedError = firebaseErrors.find(error => error.code === errorCode)
  return mappedError ? mappedError.message : defaultMessage
}

export function normalizeObjectsToArrayById(firebaseObject) {
  if (!firebaseObject) return

  const normalizedArray = Object.keys(firebaseObject).map(key => {
    const object = firebaseObject[key]
    object.id = key
    return object
  })

  return normalizedArray
}
