if (localStorage.dashUser !== undefined) {
    window.location = 'home.html'
}

const link = 'http://127.0.0.1:5001'

document.body.onload = (e) => {
    document.body.setAttribute('load', '')
}

document.querySelector('body').addEventListener('click', (e) => {
    e.preventDefault();
    const target = e.target

    switch (target.tagName) {
        case 'A':
            document.querySelectorAll('.log-div').forEach(div => {
                div.removeAttribute('open')
            })

            document.querySelector(target.getAttribute('href')).setAttribute('open', '')
            break;

        case 'BUTTON':
            switch (target.getAttribute('type')) {
                case 'new-acount':
                    login(target.parentElement.parentElement.querySelectorAll('.acount-form input'), 'new-acount')
                    break;

                case 'login':
                    login(target.parentElement.parentElement.querySelectorAll('.acount-form input'), 'login')
                    break;
            }
            break;

        case 'I':
            switch (target.classList[1]) {
                case 'fa-eye-slash':
                    target.classList.remove('fa-eye-slash')
                    target.classList.add('fa-eye')
                    target.parentElement.querySelector('input').type = 'password'
                    break;

                case 'fa-eye':
                    target.classList.remove('fa-eye')
                    target.classList.add('fa-eye-slash')
                    target.parentElement.querySelector('input').type = 'text'
                    break;
            }
    }
})

function login(inputs, type) {
    const user = {}

    inputs.forEach(input => {
        user[input.getAttribute('obj_name')] = input.value
    })
    fetch(`${link}/users`)
        .then(res => res.json())
        .then((users) => {
            if (type === 'new-acount') {
                let i = 0
                users.forEach(element => {
                    if (user.email === element.email) {
                        i = 1
                    }
                })

                if (i === 0) {
                    users.push(user)
                    fetch(`${link}/${type}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": 'application/json'
                        },
                        body: JSON.stringify(user)
                    }).then(() => {localStorage.dashUser = JSON.stringify(user)
                            window.location = 'login.html'})
                } else {
                    'usuario já cadastrado!!'
                }
            } else {
                users.forEach(element => {
                    console.log(element);
                    if (user.email === element.email && user.senha == element.senha) {
                        localStorage.dashUser = JSON.stringify(element)
                        window.location = 'login.html'
                    }
                })
            }
        })
}

