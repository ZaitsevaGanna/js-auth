import { saveSession } from '../../script/session'

// document.addEventListener('DOMContentLoaded', () => {
//   if (window.session) {
//     const { user } = window.session

//     if (user.isConfirm) {
//       location.assign('/home')
//     } else {
//       location.assign('/signup-confirm')
//     }
//   } else {
//     location.assign('/signup')
//   }
// })

document.addEventListener('DOMContentLoaded', () => {
  saveSession(null)

  location.assign('/')
})
