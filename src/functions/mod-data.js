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

async function newItem(form, type, i) {
    await fetch('http://127.0.0.1:8000', {
        method: 'GET',
        headers: {
            user: localStorage.dashUser
        }
    })
        .then(res => res.json())
        .then(data => {
            const item = objects[type]
            form.querySelectorAll('input').forEach(input => {
                item[input.getAttribute('obj_name')] = input.value
            });

            item[i] = data[i]
            data[i] += 1

            data[type].push(item)

            fetch('http://127.0.0.1:8000/newItem', {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json',
                    'user': localStorage.dashUser
                },
                body: JSON.stringify(data)
            })
        })
}



export { newItem, newItemHtml }