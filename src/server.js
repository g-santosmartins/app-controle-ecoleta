// o que são modulos, são programas feitos por terceiros que nos ajudam a fazer algumas coisas.
// mas já temos o que precisamos para conseguir seguir com um projeto, como o express por exemplo
// usamos o npm init y para gerar o package json em nosso projeto
// package-lock é um mapeamento das dependencias
// sempre fechar o package ao instalar os modulos

// -D para instalar em modo desenvolvedor
// rs para dar restart no nodemon

// logica, vamos criar o servidor:

const express = require("express")
const server = express()

// pegar o banco de dados
const db = require("./database/db") //pode ou não ter o .JS

// configurar pasta publica
server.use(express.static("public"))

//habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }))

// utilizando template engine
const nunjucks = require("nunjucks")

nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// configurar caminhos para minha aplicação (routes)

// pagina inicial/ get é um verbo HTTP
// requisição = req
//resposta = res


// o return é importante dependendo do grau de complexidade
server.get("/", (req, res) => {
    return res.render("index.html", { title: "Seu marketplace de coleta de resíduos" })
})

server.get("/create-point", (req, res) => {

    //req.query: query string da noss url
    console.log(req.query)

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

    //req.body: O corpo do formulario

    // inserir dados no banco de dados
        const query = `INSERT INTO places(
            image,
            name, 
            address,
            address2,
            state, 
            city,
            items

         ) VALUES (?,?,?,?,?,?,?);
    `
        const values = [
            req.body.image,
            req.body.name,
            req.body.address,
            req.body.address2,
            req.body.state,
            req.body.city,
            req.body.items,
        ]

        function afterInsertData(err) {
            // caso haja erro 

            if(err) {
                console.log(err)
                return res.send("Erro no cadastro!")
            }
            // caso nao haja erro 
            console.log("Cadastrado com sucesso")
            console.log(this)

            // somemente depois do cadastro
            return res.render("create.point.html", {saved: true})
        }

        // quando temos o this precisamos do function, o this funciona diferente dentro de uma arrow function
        db.run(query, values, afterInsertData)

    
})

server.get("/search", (req, res) => {

    const search = req.query.search

    if(search == "") {
        // pesquisa vazia
        return res.render("search-results.html", { total: 0 })
    }

    // pegar o dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }
        // recuperando a quantidade de linha apatir do objeto row
        const total = rows.length

        // mostrar a pagina html com os dados do banco

        return res.render("search-results.html", { places: rows, total: total })

    })


})


// ligar o servidor
server.listen(3000)



