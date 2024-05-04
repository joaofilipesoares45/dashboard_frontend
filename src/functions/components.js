import { navigation_menu } from "./navigation.js";
import { Sale } from './methods.js'

function renderFornecedores(data) {
    document.querySelectorAll('#supp-sect main .list-div').forEach(div => {
        document.querySelector('#supp-sect main').removeChild(div)
    })

    data.forEach(fornecedor => {
        document.querySelector('#supp-sect main').innerHTML +=
            `<div class="list-div">
                <h3>${fornecedor.nome} <p>ID ${fornecedor.idfornecedores}</p></h3>
                <hr>
                <div>
                    <h4>Email: <p>${fornecedor.email}</p></h4>
                    <h4>Cnpj: <p>${fornecedor.cnpj || '---'}</p></h4>
                </div>
            </div>`
    });
}

function renderClientes(data) {
    document.querySelectorAll('#client-sect main .list-div').forEach(div => {
        document.querySelector('#client-sect main').removeChild(div)
    })
    document.querySelectorAll('#select-client h4').forEach(div => {
        document.querySelector('#main-view #select-client').removeChild(div)
    })

    data.forEach(cliente => {
        let status = ['red', 'Aguardando pagamento']
        if (cliente.dabito === 0 || cliente.debito === undefined) {
            status = ['green', 'OK']
        }
        document.querySelector('#client-sect main').innerHTML +=
            `<div class="list-div">
                <h3>${cliente.nome} <p>ID ${cliente.idclientes}</p></h3>
                <hr>
                <div>
                    <h4>Email: <p>${cliente.email}</p></h4>
                    <h4>Cpf: <p>${cliente.cpf || 'Não Informado!'}</p></h4>
                </div>
                <h4 ${status[0]}>Status:<p> ${status[1]}</p></h4>
            </div>`

        document.querySelector('#select-client').innerHTML += `<h4 idcliente="${cliente.idclientes}">${cliente.nome}</h4>`
    })
}

function renderProdutos(data) {
    document.querySelectorAll('#product-sect main .list-div').forEach(div => {
        document.querySelector('#product-sect main').removeChild(div)
    })

    data.forEach(produto => {
        document.querySelector('#product-sect main').innerHTML +=
            `<div class="list-div">
                <h3>${produto.nome} <p>ID ${produto.idprodutos}</p></h3>
                <hr>
                <div>
                    <h4>Fornecedor: <p>${produto.fornecedor || 'Não Informado!'}</p></h4>
                    <h4>Estoque: <p>${produto.estoque || 0} ${produto.medida || 'un'}</p></h4>
                    <h4>Preço venda: <p>${Number(produto.valorVenda).toFixed(2) || 0}</p></h4>
                </div>
            </div>`
    })
}

function renderSale(data) {
    document.querySelectorAll('#sale-sect main .list-div').forEach(div => {
        document.querySelector('#sale-sect main').removeChild(div)
    })

    data.vendas.forEach(venda => {
        const sale = new Sale(venda);
        venda = sale

        let cliente
        data.clientes.forEach(c => {
            if (c.idclientes === sale.idclientes) {
                cliente = c
            }
        })

        const date = new Date(sale.data)

        let html = ``
        let total = 0
        venda.listavenda.forEach(produto => {
            html += `<li>${produto[0].nome} <p>Quantidade: ${produto[1]}</p> <p>Valor(un): ${Number(produto[0].valorVenda).toFixed(2)}</p><p>total: ${(Number(produto[0].valorVenda) * Number(produto[1])).toFixed(2)}</p></li>`

            total += Number(produto[0].valorVenda) * Number(produto[1])
        })

        const color = sale.status === 'Aguardando Pagamento' ? 'color:red' : 'color:green;'

        document.querySelector('#sale-sect main').innerHTML +=
            `<div class="list-div">
                <h3>Cliente: ${cliente.nome}<p>ID ${sale.idvendas}</p></h3>
                <hr>
                <div>
                    <h4>Data: <p>${date.toLocaleDateString()}</p></h4>
                    <h4>Total: <p>R$ ${sale.total().toFixed(2)}</p></h4>
                    <h4>Status: <p style="font-size: .9rem; font-weight: 400;${color}">${sale.status}</p></h4>
                    <h4>
                        Produtos: <i class="fa-solid fa-list-ul"></i>
                    </h4>
                    <spam><h5>Lista de Produtos:</h5>${html}</spam>
                </div>
            </div>`
    })
}

function newSaleHtml(data, idcliente) {
    navigation_menu('#new-sale')
    document.querySelector('#main-view #select-client').removeAttribute('open')

    const div = document.querySelector('#new-sale')
    data.clientes.forEach(cliente => {
        if (cliente.idclientes === Number(idcliente)) {
            div.querySelector('h2').textContent = `Cliente: ${cliente.nome}`
        }
    })

    div.querySelectorAll('#list-products .list-div').forEach(list => {
        div.querySelector('#list-products').removeChild(list)
    })
    data.produtos.forEach(produto => {
        div.querySelector('main #list-products').innerHTML +=
            `<div class="list-div" id="${produto.idprodutos}">
                <h3>${produto.nome}</h3>
                <hr>
                <h4>Estoque: ${produto.estoque} ${produto.medida}</h4>
                <h4>Preço: ${Number(produto.valorVenda).toFixed(2)}</h4>
            </div>`
    })
}

function listVendaHtml(list) {
    const div = document.querySelector('#new-sale #list-sale')

    div.querySelectorAll('.list-div').forEach(list => {
        div.removeChild(list)
    })

    list.forEach(element => {
        const produto = element[0]
        div.innerHTML +=
            `<div class="list-div" id="${list.indexOf(element)}">
            <h3>${produto.nome}</h3>
            <hr>
            <h4><p>Preço<br>${produto.valorVenda}</p> <p>un<br>${element[1]}</p> <p>Total<br>${Number(produto.valorVenda) * element[1]}</p></h4>
            <div><button>Editar</button><button>Remover</button></div>
        </div>`
    });

}

function renderDashboard(data, period) {
    const header = document.querySelector('#home-sect header')

    let vendido = 0
    let pendente = 0
    let arrecadacao = 0
    let despesas = 0
    data.vendas.forEach(venda => {
        const sale = new Sale(venda);
        
        const saledate = new Date(sale.data)
        let date 
        if (period === undefined) {
            date = new Date()
        } else {
            date = new Date(`${period}-02`)
        }

        if (saledate.getMonth() === date.getMonth()) {
            vendido += sale.total()

            if (sale.status === 'Aguardando Pagamento') {
                pendente += sale.total()
            } else if (sale.status === 'Pagamento Confirmado') {
                arrecadacao += sale.total()
            }
        }
    })

    header.children[0].querySelector('i').setAttribute('value', `R$ ${vendido.toFixed(2)}`)
    header.children[1].querySelector('i').setAttribute('value', `R$ ${pendente.toFixed(2)}`)
    header.children[2].querySelector('i').setAttribute('value', `R$ ${arrecadacao.toFixed(2)}`)
    header.children[3].querySelector('i').setAttribute('value', `R$ ${despesas.toFixed(2)}`)
}

export { renderFornecedores, renderClientes, renderProdutos, renderSale, newSaleHtml, listVendaHtml, renderDashboard }