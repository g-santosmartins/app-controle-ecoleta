// importar a dependencia do sql


// verbose, faz com meu banco mostre msgs dentro do meu terminal, sendo verboso
const sqlite3 = require("sqlite3").verbose()

// criar o objeto que irar fazer o operações no banco de dados

const db = new sqlite3.Database("./src/database/databse.db")


// vamos modular o banco
module.exports = db


// vamos
// assim posso roda o banco e criar com o comando $ node src/database/db.js

// utilizar o obejto de banco de dados, para nossas operações
// serialize, é para rodar a sequencia de codigo

// db.serialize(() => {
//     // serialize= passo a passo
//     // Com comandos SQL
//     // 1 criar uma tabela
//     // famosas querys
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT, 
//             name TEXT, 
//             address TEXT, 
//             address2 TEXT,
//             state TEXT,
//             city TEXT, 
//             items TEXT
//         );
    
//     `)

//     //2 inserir dados na tabela

//     const query = `INSERT INTO places(
//         image,
//         name, 
//         address,
//         address2,
//         state, 
//         city,
//         items

//      ) VALUES (?,?,?,?,?,?,?);
// `
//     const values = [
//         "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
//         "PaperSider",
//         "Guilherme Gemballa, Jardim América",
//         "Nº 260 ",
//         "Santa Catarina ",
//         "São Paulo",
//         "Residuos Eletrônicos, Lâmpadas"

//     ]

//     function afterInsertData(err) {
//         // caso haja erro 

//         if(err) {
//             return console.log(err)
//         }
//         // caso nao haja erro 
//         console.log("Cadastrado com sucesso")
//         console.log(this)
//     }

//     // quando temos o this precisamos do function, o this funciona diferente dentro de uma arrow function
//     db.run(query, values, afterInsertData)

//     //3 Consultar os dados na tabela
//     // db.all(`SELECT name FROM places`, function(err, rows) {
//     //     if(err) {
//     //         return console.log(err)
//     //     }
//     //     if(rows = []) {
//     //         return console.log("Não temos registros")
//     //     }

//     //     console.log("Aqui estão seus registros: ")
//     //     console.log(rows)
//     // })
//     //4 Deletar dados na tabela
//     // quando usamos uma interrogação temos que passar como parametro o array que dos valores que não foram especificados

//     // db.run(`DELETE FROM places WHERE id = ?`, [1], function(err){
//     //     if(err) {
//     //         return console.log(err)
//     //     }

//     //     console.log("Registro deletado com sucesso!")
//     // })
// })





// apos rodar o cadastro temos

// $ node src/database/db.js
// Cadastrado com sucesso
// Statement {
//   sql: 'INSERT INTO places(\n' +
//     '        image,\n' +
//     '        name, \n' +
//     '        address,\n' +
//     '        address2,\n' +
//     '        state, \n' +
//     '        city,\n' +
//     '        items\n' +
//     '\n' +
//     '     ) VALUES (?,?,?,?,?,?,?);\n',
//   lastID: 1,
//   changes: 1
// }