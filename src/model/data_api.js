const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()
app.use(express.json())
app.use(cors());

const port = 8000

const dataFile = 'data.json'

const save = (data, file) => {
    if (file === undefined) {
        fs.writeFileSync(`uploads/usuarios.json`, JSON.stringify(data))
    } else {
        fs.writeFileSync(`uploads/user${file.id}.json`, JSON.stringify(data))
    }
}

const data_init = {
    user: '',
    idclientes: 0,
    idvendas: 0,
    idcompras: 0,
    idprodutos: 0,
    idfornecedores: 0,

    fornecedores: [],
    clientes: [],
    produtos: [],
    compras: [],
    vendas: [],
}

app.get('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST,DELETE,PUT,GET");

    console.log("Hello world!!");

    const file = JSON.parse(req.headers.user)
    res.sendFile(path.resolve(`./uploads/user${file.id}.json`))
})

app.post('/newItem', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST,DELETE,PUT,GET");

    const file = JSON.parse(req.headers.user)
    save(req.body, file);
})

app.get('/users', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST,DELETE,PUT,GET");

    res.sendFile(path.resolve(`./uploads/usuarios.json`))
})

app.post('/new-acount', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST,DELETE,PUT,GET");

    data_init.user = req.body[0]
    save(data_init, req.body[0])
    save(req.body[1]);
})

app.post('/login', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST,DELETE,PUT,GET");

    res.sendFile(path.resolve(`./uploads/usuarios.json`))
})

app.post('/new-sale', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST,DELETE,PUT,GET");

    const file = JSON.parse(req.headers.user)
    save(req.body, file);
})


app.listen(port, (req, res) => {
    console.log(`Rodando na porta ${port}!`);
    console.log("https://finance-dashboard-bice.vercel.app:8000");
})
