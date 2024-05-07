function newItemHtml(btn) {
    const type = {
        'clientes': {
            nome: String,
            cpf: Number,
            endereço: String,
            telefone: Number,
            email: String,

        },

        'produtos': {
            nome: String,
            estoque: Number,
            categoria: String,
            valorCompra: Number,
            valorVenda: Number,
            fornecedor: String,
            medida: String,
        },

        'fornecedores': {
            nome: String,
            cnpj: Number,
            endereço: String,
            telefone: Number,
            email: String
        }
    }

    try {
        document.querySelector('#new-item .inputs-form').innerHTML = ''
        Object.keys(type[btn.type]).forEach(name => {
            document.querySelector('#new-item h2').textContent = `Novo ${btn.type}`
            document.querySelector('#new-item .inputs-form').innerHTML += `<div><h4>${name}</h4><input placeholder="${name}" obj_name="${name}"></div>`
            document.querySelector('#new-item button').setAttribute('type', btn.type)
            document.querySelector('#new-item button').setAttribute('i', `id${btn.type}`)
        })
    } catch (error) {

    }

}

const objects = {

    'clientes': {
        id: Number,
        nome: String,
        cpf: Number,
        endereço: String,
        telefone: Number,
        email: String,
        debito: 0,
        idvendas: [],
    },

    'produtos': {
        id: Number,
        nome: String,
        estoque: Number,
        vendidos: Number,
        categoria: String,
        valorCompra: Number,
        valorVenda: Number,
        fornecedor: String,
        medida: String,
    },

    'fornecedores': {
        id: Number,
        nome: String,
        cnpj: Number,
        endereço: String,
        telefone: Number,
        email: String
    }
}

async function newItem(form, type, link) {

    const data = {}
    form.querySelectorAll('input').forEach(input => {
        data[input.getAttribute('obj_name')] = input.value
    });
    data.user_id = JSON.parse(localStorage.dashUser).id

    let url
    switch (type) {
        case 'fornecedores':
            url = `${link}/new-client`
            break;
        case 'produtos':
            url = `${link}/new-product`
            break;

        case 'clientes':
            url = `${link}/new-supplier`
            break
    }
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
            'user': localStorage.dashUser
        },
        body: JSON.stringify(data)
    })
}



export { newItem, newItemHtml }