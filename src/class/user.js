class User {
  static USER_ROLE = {
    USER: 0,
    ADMIN: 1,
    DEVELOPER: 2,
  }

  static #list = []

  static #count = 1

  constructor({ email, password, role }) {
    this.id = User.#count++
    this.email = String(email).toLowerCase()
    this.password = String(password)
    this.role = User.#convertRole(role)
    this.isConfirm = false
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
    console.log(this.#list)
    return user
  }

  static getByEmail(email) {
    return (
      this.#list.find(
        (user) =>
          user.email === String(email).toLowerCase(),
      ) || null
    )
  }

  static getList() {
    return this.#list
  }

  static getRoleById(roleId) {
    switch (roleId) {
      case 0:
        return 'Користувач'
      case 1:
        return 'Адміниістратор'
      case 2:
        return 'Розробник'
      default:
        return 'Хз хто!!!'
    }
  }
}

module.exports = { User }
