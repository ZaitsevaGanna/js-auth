import { List } from '../../script/list'
import { USER_ROLE } from '../../script/user'

class UserList extends List {
  constructor() {
    super()

    this.element = document.querySelector('#user-list')

    if (!this.element) throw new Error('Element is null')

    this.loadData()
  }

  loadData = async () => {
    this.updateStatus(this.STATE.LOADING)
    //return null

    try {
      const res = await fetch('user-list-data', {
        method: 'GET',
      })

      const data = await res.json()

      if (res.ok) {
        this.updateStatus(
          this.STATE.SUCCESS,
          this.convertData(data),
        )
      } else {
        this.updateStatus(this.STATE.ERROR, data)
      }
    } catch (e) {
      console.log(e)
      this.updateStatus(this.STATE.ERROR, {
        message: error.message,
      })
    }
  }

  convertData = (data) => {
    return {
      ...data,
      list: data.list.map((user) => ({
        ...user,
        role: USER_ROLE[user.role],
      })),
    }
  }

  updateView = () => {
    this.element.innerHTML = ''
    console.log(this.status, this.data)

    switch (this.status) {
      case this.STATE.LOADING:
        this.element.innerHTML = `<div class="user">
          <span class="user_title skeleton"></span>
           <span class="user_sub skeleton"></span></div>
           
           <div class="user">
          <span class="user_title skeleton"></span>
           <span class="user_sub skeleton"></span></div>
           
           <div class="user">
          <span class="user_title skeleton"></span>
           <span class="user_sub skeleton"></span></div>
           
           <div class="user">
          <span class="user_title skeleton"></span>
           <span class="user_sub skeleton"></span></div>`

        break

      case this.STATE.SUCCESS:
        this.data.list.forEach((item) => {
          this.element.innerHTML += `<a href=/user-item?id=${item.id} class="user user_click">
          <span class="user_title">${item.email}</span>
           <span class="user_sub">${item.role}</span>`
        })

        break

      case this.STATE.ERROR:
        this.element.innerHTML = `<span class="alert alert_alert">${this.data.message}</span>`

        break
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  try {
    if (!window.session || !window.session.user.isConfirm) {
      location.assign('/')
    }
  } catch (e) {}

  new UserList()
})
