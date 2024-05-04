import { getData } from "../code/index.js"

let dataBase
getData().then(data => {
    dataBase = data
})

class Sale {

    constructor(sale) {
        if (sale !== undefined) {
            this.idclientes = sale.idclientes
            this.status = sale.status
            this.listavenda = sale.listavenda
            this.idvendas = sale.idvendas
            this.data = sale.data
        }
    }

    idclientes
    status
    listavenda = []
    idvendas
    data

    total() {
        let i = 0
        this.listavenda.forEach(produto => {
            i += Number(produto[0].valorVenda) * produto[1]
        });
        return i
    }
    lucro() {
        let i = 0
        this.listavenda.forEach(produto => {
            i += (Number(produto[0].valorVenda) - Number(produto[0].valorCompra)) * produto[1]
        });
        return i
    }
}


class Purchase {
    idfornecedores = ''
    listacompra = []
    idcompras = ''
    data = ''
    total() {
        let i = 0
        this.listacompra.forEach(produto => {
            i += Number(produto.valorCompra)
        });
        return i
    }
}


export {
    Sale,
    Purchase
}