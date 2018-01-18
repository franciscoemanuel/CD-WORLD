const defaultMessage = 'Erro inesperado, tente novamente mais tarde!'

const firebaseErrors = [
  { code: 'auth/user-not-found', message: 'E-mail ou senha incorretos' },
  { code: 'auth/email-already-in-use', message: 'Este e-mail já está em uso' }
]

export function translateFirebaseErrorCodeToMessage(errorCode) {
  const mappedError = firebaseErrors.find(error => error.code === errorCode)
  return mappedError ? mappedError.message : defaultMessage
}
