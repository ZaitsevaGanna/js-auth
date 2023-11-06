class CheckBox {
  static toggle = (target) => {
    target.toggleAttribute('active')
  }
}

window.checkBox = CheckBox
