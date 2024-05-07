import { listVendaHtml, newSaleHtml, renderClientes, renderDashboard, renderFornecedores, renderProdutos, renderSale } from "../functions/components.js"
import { exeConfig } from "../functions/config.js"
import { Purchase, Sale } from "../functions/methods.js"
import { newItem, newItemHtml } from "../functions/mod-data.js"
import { navigation_menu } from "../functions/navigation.js"

if (localStorage.dashUser === undefined) {
    window.location = 'login.html'
}
const link = 'http://127.0.0.1:5001'
let dB

async function getData() {
    let data01
    await fetch(link, {
        method: 'GET',
        headers: {
            user: localStorage.dashUser
        }
    })
        .then(res => res.json())
        .then(data => {
            // console.clear()
            // renderFornecedores()
            // renderClientes()
            // renderProdutos()
            // renderSale()
            // renderDashboard()

            document.body.setAttribute('load', '')
            document.querySelector('#top-header .header-opt .fa-user').setAttribute('title', data[0].nome)
        }).catch((error) => {
            getData()
            // console.clear()
            // console.log('Falha na conexão com o servidor!!!')
        })

    return data01
}

document.body.onload = () => {
    setTimeout(() => {
        navigation_menu(localStorage.lastSect)
    }, 100)

    getData()

    if (localStorage.darkMode === 'True') {
        exeConfig('Modo noturno')
        document.querySelectorAll('#config-sect main .config-div')[0].querySelector('p').setAttribute('active', '')
    }
}

let actualSale

document.querySelector('#sidebar-menu').addEventListener('click', (e) => {
    e.preventDefault()
    const target = e.target

    switch (target.classList[1]) {
        case 'fa-chevron-right':
            const sideBar = document.querySelector(target.getAttribute('for'))
            if (sideBar.hasAttribute('open')) {
                sideBar.removeAttribute('open')
            } else {
                sideBar.setAttribute('open', '')
            }
            break;
        default:
            target.parentElement.removeAttribute('open')
            break
    }
})

document.querySelector('body').addEventListener('click', (e) => {
    const target = e.target

    if (target.classList[1] === 'fa-magnifying-glass') {
        document.querySelector('#search-div').setAttribute('open', '')
        document.querySelector('#search-div input').value = ''
        document.querySelector('#search-div input').setAttribute('list', target.getAttribute('list'))

        renderFornecedores(dB.fornecedores)
        renderClientes(dB.clientes)
        renderProdutos(dB.produtos)
    } else if (target.tagName === 'INPUT' || target.tagName === 'LABEL') {
    } else {
        document.querySelectorAll('.modal').forEach(div => {
            div.removeAttribute('open')
        })
    }

    if (target.classList[0] === 'filter-btn') {
        document.querySelector('#filter-div').setAttribute('open', '')
    }

    if (target.classList[0] === 'newitem-btn') {
        if (target.getAttribute('href') !== '') {
            document.querySelector('#new-item a').setAttribute('href', `#${target.parentElement.parentElement.id}`)
            navigation_menu(target.getAttribute('href'))
            newItemHtml(target)
        }
    }

    if (target.tagName === 'A' && target.parentElement.id !== 'main-navbar') {
        e.preventDefault()
        const href = target.getAttribute('href')
        if (href === '#get-out') {
            localStorage.removeItem('dashUser')
            window.location = 'login.html'
        } else {
            if (href !== '') {
                navigation_menu(href)
            } else {
                switch (target.type) {
                    case 'compras':

                        break;

                    case 'vendas':
                        document.querySelector('#main-view #select-client').setAttribute('open', '')
                        break;
                }
            }
        }
    }

    if (target.id === 'close-set-client') {
        document.querySelector('#main-view #select-client').removeAttribute('open')
    }

    if (target.parentElement.id === 'select-client' && target.tagName === 'H4') {
        actualSale = new Sale()
        actualSale.idclientes = Number(target.getAttribute('idcliente'))
        actualSale.idvendas = dB.idvendas
        actualSale.data = new Date().getTime()

        newSaleHtml(dB, actualSale.idclientes)
    }

    if (target.tagName === 'I') {
        const input = target.parentElement.querySelector('input')

        switch (target.classList[1]) {
            case 'fa-plus':

                input.value = Number(input.value) + 1
                break;

            case 'fa-minus':
                if (input.value > 1) {
                    input.value = Number(input.value) - 1
                }

                break;
        }

        if (target.classList[1] === 'fa-user' && target.parentElement.classList[0] === 'header-opt') {
            target.querySelector('a').click()
        }

        if (target.classList[1] === 'fa-bell' && target.parentElement.classList[0] === 'header-opt') {
            document.querySelector('#dinamic-modal').setAttribute('open', '')
        }
        if (target.classList[1] === 'fa-xmark' && target.parentElement.id === 'dinamic-modal') {
            target.parentElement.removeAttribute('open')
        }

        if (target.parentElement.classList[0] === 'resume-div') {
            switch (target.classList[1]) {
                case 'fa-eye':
                    target.removeAttribute('hidden')
                    target.classList.remove('fa-eye')
                    target.classList.add('fa-eye-slash')
                    break;

                case 'fa-eye-slash':
                    target.setAttribute('hidden', '')
                    target.classList.remove('fa-eye-slash')
                    target.classList.add('fa-eye')
                    break;
            }
        }
    }

    if (target.tagName === 'P' && target.parentElement.classList[0] === 'config-btn') {

        if (target.hasAttribute('active')) {
            target.removeAttribute('active')
        } else {
            target.setAttribute('active', '')
        }
        exeConfig(target.parentElement.textContent)
    }
})

document.querySelector('#new-item').addEventListener('click', (e) => {
    const target = e.target
    const form = document.querySelector('#new-item .inputs-form')

    switch (target.classList[0]) {
        case 'cancel':
            navigation_menu(target.getAttribute('href'))
            break;

        case 'confirm':
            newItem(form, target.getAttribute('type'), link)
            break;
    }
})

document.querySelector('#search-div').addEventListener('keyup', (e) => {
    const input = e.target
    const searchResult = []
    dB[input.getAttribute('list')].forEach(element => {
        if ((element.nome.toLowerCase()).includes(input.value.toLowerCase())) {
            searchResult.push(element)
        }
    });

    document.querySelectorAll('#main-view main .list-div').forEach(div => {
        if ((div.querySelector('h3').textContent.toLowerCase()).includes(input.value.toLowerCase())) {
            div.removeAttribute('hidden')
        } else {
            div.setAttribute('hidden', '')
        }
    })

    // switch (input.getAttribute('list')) {
    //     case 'fornecedores':
    //         renderFornecedores(searchResult)
    //         break;

    //     case 'produtos':
    //         renderProdutos(searchResult)
    //         break;

    //     case 'clientes':
    //         renderClientes(searchResult)
    //         break
    // }
})

let selectedProduct
document.querySelector('#new-sale').addEventListener('click', (e) => {
    const target = e.target
    const newSale = document.querySelector('#new-sale')
    const setProduto = newSale.querySelector('#set-produto')

    if (target.classList[0] === 'list-div' && target.parentElement.id === 'list-products') {
        setProduto.setAttribute('open', '')
        dB.produtos.forEach(produto => {
            if (produto.idprodutos === Number(target.id)) {
                selectedProduct = produto
                setProduto.querySelector('h3').innerHTML = `${produto.nome} <p>Cancelar</p>`
            }
        })
    }

    if (target.id === 'confirm-quant') {
        setProduto.removeAttribute('open')
        actualSale.listavenda.push([selectedProduct, Number(target.parentElement.querySelector('input').value)])

        target.parentElement.querySelector('input').value = 1
        listVendaHtml(actualSale.listavenda)
        console.log(actualSale);
    }

    if (target.classList[1] === 'fa-cart-shopping') {
        if (newSale.querySelector('#list-sale').hasAttribute('open')) {
            newSale.querySelector('#list-sale').removeAttribute('open')
            newSale.querySelector('#list-products').setAttribute('open', '')

        } else {
            newSale.querySelector('#list-sale').setAttribute('open', '')
            newSale.querySelector('#list-products').removeAttribute('open')
        }
    }

    if (target.tagName === 'P' && target.textContent === 'Cancelar') {
        setProduto.removeAttribute('open')
    }

    if (target.tagName === 'BUTTON' && target.textContent === 'Remover') {
        actualSale.listavenda.splice(target.parentElement.parentElement.id, 1)
        listVendaHtml(actualSale.listavenda)
        console.log(actualSale);
    }

    if (actualSale.listavenda.length > 0) {
        document.querySelector('#finalize-sale').setAttribute('open', '')
    } else {
        document.querySelector('#finalize-sale').removeAttribute('open')
    }


    if (target.id === 'finalize-sale') {
        dB.clientes.forEach(cliente => {
            if (cliente.idclientes === actualSale.idclientes) {
                cliente.debito += actualSale.total()
                cliente.idvendas.push(actualSale.idvendas)
            }
        })
        dB.produtos.forEach(produto => {
            actualSale.listavenda.forEach(produtoSale => {
                if (produto.idprodutos === produtoSale[0].idprodutos) {
                    produto.estoque -= produtoSale[1]
                }
            })
        })
        actualSale.status = 'Aguardando Pagamento'
        dB.vendas.push(actualSale)
        dB.idvendas += 1

        fetch('http://127.0.0.1:8000/newItem', {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                'user': localStorage.dashUser
            },
            body: JSON.stringify(dB)
        })
    }
})


document.querySelector('#home-sect main #main-navbar').onclick = (e) => {
    const target = e.target
    if (target.tagName === 'A') {
        e.preventDefault()
        document.querySelector('#home-sect main').scroll({
            top: document.querySelector(target.getAttribute('href')).offsetTop - 73,
        })

        document.querySelectorAll('#home-sect main .gr-div').forEach(div => {
            div.removeAttribute('open')
            if (div.id === target.getAttribute('href').replace('#', '')) {
                div.setAttribute('open', '')
            }

            setTimeout(() => {
                div.setAttribute('open', '')
            }, 1000)
        })
        target.parentElement.querySelectorAll('a').forEach(a => {
            a.removeAttribute('selected')
        })
        target.setAttribute('selected', '')
    }
}

document.querySelector('#home-sect h2 #set-month input').addEventListener('change', (e) => {
    const input = e.target
    renderDashboard(dB, input.value);
})

export { getData }