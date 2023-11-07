class FieldSelect {
  static toggle = (target) => {
    // const option = document.querySelector(
    //   '.field_option_list',
    // )
    // option.toggleAttribute('active')

    const options = target.nextElementSibling
    options.toggleAttribute('active')

    setTimeout(() => {
      window.addEventListener(
        'click',
        (e) => {
          if (!options.parentElement.contains(e.target)) {
            options.removeAttribute('active')
          }
        },
        { once: true },
      )
    })
  }

  static change = (target) => {
    const active =
      target.parentElement.querySelector('*[active]')
    if (active) active.toggleAttribute('active')

    target.toggleAttribute('active')

    const parent = target.parentElement.parentElement

    const value = parent.querySelector('.field_value')

    if (value) {
      value.innerText = target.innerText
      value.classList.remove('.field_value_placeholder')
    }

    const list = target.parentElement
    list.toggleAttribute('active')
  }
}

window.fieldSelect = FieldSelect
