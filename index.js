//Importações
const db = require('./conexao');
const express = require('express');

//Criar a aplicação JavaScript com servidor Express
const app = express();
app.use(express.json());


//Criar a rota para consultar todos os usuarios 
app.get('/usuarios',(req, res)=>{
    const sql = "SELECT * FROM tb_usuarios";
    db.query(sql, (erro, resultados)=>{
        if(erro){
            console.log("falha ao consultar usúarios");
            return res.json({mensagem: "Falha ao consultar usúarios"});
        }else{
            return res.json(resultados);
        }
    });  
});//fim da rota para consultar todos usuarios


// Criar a rota para consultar um usuário pelo ID
app.get('/usuarios/:codigo',(req, res)=>{
    const id_informado = req.params.codigo;
    const sql = "SELECT * FROM tb_usuarios WHERE id_usuario = ?";
    db.query(sql, [id_informado], (erro, resultados)=>{
        if(erro){
            console.log("Falha ao consultar usuário");
            return res.json({messagem:"Falha ao consultar usuário"+erro.message});
        }
        // Contar a quantidade de linhas de resultados
        if(resultados.length == 0){
            return res.json({messagem: "Usuário não encontrado"})
        }else{
            return res.json(resultados);
        }
    });
});//fim da rota para consultar um usuario pelo ID
    

//Criar a rota para consultar todos os clientes
app.get('/clientes',(req, res)=>{
    const sql = "SELECT * FROM tb_clientes";
    db.query(sql, (erro, resultados)=>{
        if(erro){
            console.log("falha ao consultar clientes");
            return res.json({mensagem: "Falha ao consultar clientes"+erro.message});
        }else{
            return res.json(resultados);
        }
    });
});//fim da rota para consultar todos clientes

// Criar rota para cadastrar usuário via post
app.post('/cad_usuario', (req, res)=>{
    const {login_informado, senha_informada} = req.body;
    const sql = "INSERT INTO tb_usuarios (login_usuario, senha_usuario) VALUES (?,?)";
    db.query(sql, [login_informado, senha_informada], (erro, resultados)=>{
        if(erro){
            console.log("Falha ao cadastrar");
            return res.json({mensagem:"Falha ao cadastrar:"+erro.message});
        }else{
            console.log("Cadastrado com sucesso");
            return res.json({mensagem:"Cadastrado com sucesso"});
        }
    });
});
 
// Rota para deletar um usuário
app.get('/deletar_usuario/:codigo',(req, res)=>{
    const id_informado = req.params.codigo;
    const sql = "DELETE FROM tb_usuarios WHERE id_usuario = ?";
    db.query(sql, [id_informado], (erro, resultados)=>{
        if(erro){
            console.log("Falha ao deletar");
            return res.json({messagem:"Falha ao deletar usuário"+erro.message});
        }
        // Contar a quantidade de linhas de resultados
        if(resultados.affectedRows == 0){
            return res.json({messagem: "Usuário não inexistente"});
        }
        return res.json({mensagem: "usuário deletado com sucesso"});
        
    });
});//fim da rota para deletar


// Criar rota para atualizar usuário
app.get('/atualizar_usuario/:codigo',(req, res)=>{
    const id_informado = req.params.codigo;
    const {login_informado, senha_informada} = req.body;
    const sql = `UPDATE tb_usuarios SET login_usuario = ?,
                senha_usuario = ? WHERE id_usuario = ?`;
    db.query(sql, [login_informado, senha_informada, id_informado], 
        (erro, resultados)=>{
        if(erro){
            return res.json({messagem:"Falha ao atualizar"+erro.message});
        }
        if(resultados.affectedRows == 0){
            return res.json({messagem: "Nada alterado"});
        }
        return res.json({mensagem: "Atualizao com sucesso"});
        
    });
});//fim da rota atualizar usuario

//Rota para fazer login
app.get('/fazerLogin/:usuario/:senha', (req, res)=>{
    const usuario = req.params.usuario;
    const senha = req.params.senha;
    const sql = `SELECT * FROM tb_usuarios
                 WHERE login_usuario = ?
                 AND senha_usuario = ?
                `;
    db.query(sql, [usuario, senha], (erro, resultados)=>{
        if(erro){
            return res.json({mensagem: "Falha ao consultar:"+erro.message});
        }
        if(resultados.length == 0){
            return res.json({loginok: false});
        }else{
            return res.json({loginok: true});
        }
    });

}); //fim da rota fazer login



// Rodar o sevidor
  const porta = 3000;
  app.listen(porta,()=>{
      console.log("Servidor execultando na porta de nº "+porta);
  });




