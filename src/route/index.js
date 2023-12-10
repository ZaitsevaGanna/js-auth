// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

// Підключіть файли роутів
const auth = require('./auth')
const user = require('./user')
// Підключіть інші файли роутів, якщо є

// Об'єднайте файли роутів за потреби
router.use('/', auth)
router.use('/', user)
// Використовуйте інші файли роутів, якщо є
router.get('/', (req, res) => {
  res.render('index', {
    name: 'index',
    component: [],
    title: 'Index page',
    data: {},
  })
})

router.get('/home', (req, res) => {
  res.render('home', {
    name: 'home',
    component: [],
    title: 'Home page',
    data: {},
  })
})

router.get('/logout', (req, res) => {
  res.render('logout', {
    name: 'logout',
    component: [],
    title: 'Logout page',
    data: {},
  })
})

// Експортуємо глобальний роутер
module.exports = router
