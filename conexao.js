const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',     // Endereço do servidor MySQL
  user: 'root',   // Usuário do MySQL
  password: 'root', // Senha do MySQL
  database: 'bd_clinica' // Nome do banco de dados
});

db.connect((erro) => {
  if (erro) {
    console.error('Erro ao conectar ao MySQL:', erro.message);
    return;
  }
  console.log('Conexão com o MySQL estabelecida com sucesso');
});

module.exports = db;