import { List } from '../../script/list'
import { USER_ROLE } from '../../script/user'

class UserItem extends List {
  constructor() {
    super()

    this.element = document.querySelector('#user-item')

    if (!this.element) throw new Error('Element is null')

    //this.id = new URL(location.href).searchParams.get('id')

    this.id = new URLSearchParams(location.search).get('id')
    if (!this.id) location.assign('/user-list')

    this.loadData()
  }

  loadData = async () => {
    this.updateStatus(this.STATE.LOADING)
    //return null
    console.log('user-item-data?id=', this.id)
    try {
      const res = await fetch(
        `user-item-data?id=${this.id}`,
        {
          method: 'GET',
        },
      )

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
      user: {
        ...data.user,
        role: USER_ROLE[data.user.role],
        confirm: data.user.isConfirm ? 'Так' : 'Ні',
      },
    }
  }

  updateView = () => {
    this.element.innerHTML = ''
    console.log(this.status, this.data)

    switch (this.status) {
      case this.STATE.LOADING:
        this.element.innerHTML = `<div class="data">
          <span class="data_title">ID:</span>
           <span class="data_sub skeleton"></span></div>
           
           <div class="data">
          <span class="data_title ">E-mail:</span>
           <span class="data_sub skeleton"></span></div>
           
           <div class="data">
          <span class="data_title ">Роль:</span>
           <span class="data_sub skeleton"></span></div>
           
           <div class="data">
          <span class="data_title ">Пошта підтверджена?</span>
           <span class="data_sub skeleton"></span></div>`

        break

      case this.STATE.SUCCESS:
        const { id, email, role, confirm } = this.data.user
        this.element.innerHTML = `<div class="data">
          <span class="data_title ">ID</span>
           <span class="data_sub ">${id}</span></div>
           
           <div class="data">
          <span class="data_title ">E-mail</span>
           <span class="data_sub ">${email}</span></div>
           
           <div class="data">
          <span class="data_title ">Роль</span>
           <span class="data_sub ">${role}</span></div>
           
           <div class="data">
          <span class="data_title ">Пошта підтверджена</span>
           <span class="data_sub ">${confirm}</span></div>`

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

  new UserItem()
})
