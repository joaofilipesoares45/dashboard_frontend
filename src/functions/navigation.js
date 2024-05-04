function navigation_menu(href) {
    if (href !== '') {
        document.querySelectorAll('main .view-sect').forEach(div => {
            div.removeAttribute('open')
        })

        document.querySelectorAll('#sidebar-menu a').forEach(a => {
            if (a.getAttribute('href') === href) {
                a.setAttribute('select', '')
            } else {
                a.removeAttribute('select')
            }
        })
        document.querySelector(href).setAttribute('open', '')

        if (href !== '#new-item') {
            localStorage.lastSect = href
        }
    }

}

export { navigation_menu }