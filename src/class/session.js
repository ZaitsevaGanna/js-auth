class Session {
  static #list = []

  constructor(user) {
    this.user = {
      role: user.role,
      isConfirm: user.isConfirm,
      email: user.email,
      id: user.id,
    }
    this.token = Session.generateToken()
  }

  static generateToken = () => {
    const length = 6
    const characters =
      'AaBbCcDdEeFfGgHhJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(
        Math.random() * characters.length,
      )
      result += characters[randomIndex]
    }
    return result
  }

  static create = (user) => {
    const session = new Session(user)
    this.#list.push(session)
    return session
  }

  static get = (token) => {
    return this.#list.find(
      (item) => item.token === token || null,
    )
  }
}

module.exports = { Session }
console.log('Token:', Session.generateToken())
