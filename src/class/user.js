class User {
  static USER_ROLE = {
    USER: 0,
    ADMIN: 1,
    DEVELOPER: 2,
  }

  static #list = []

  constructor({ email, password, role }) {
    this.email = email
    this.password = password
    this.role = User.#convertRole(role)
  }

  static #convertRole = (role) => {
    role = Number(role)

    if (isNaN(role)) {
      role = this.USER_ROLE.USER
    }

    role = Object.values(this.USER_ROLE).includes(role)
      ? role
      : this.USER_ROLE.USER

    return role
  }

  static create(data) {
    const user = new User(data)

    this.#list.push(user)
  }
}

module.exports = { User }
