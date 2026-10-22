const Estudante = require('../models/Estudante');

let estudantes = [
    new Estudante(1, "Maria Silva", "2005-03-25", "86999991111"),
    new Estudante(2, "Joao Santos", "2004-07-22", "86999992222")
];
let proximoId = 3;
class EstudanteController{
    static listarTodos(req, res){
        return res.status(200).json(estudantes);
    }
    static listarPorId(req, res){
        const id = parseInt(req.params.id);
        const estudante = estudantes.find(e =>e.id === id);
        if (!estudante){
            return res.status(404).json({erro: "estudante nao encontrado"});
        }
        return res.status(200).json(estudante); 
    }
    static salvar(req, res){
         const { nome, dataNascimento, telefone} = req.body;
         if (!nome || !dataNascimento){
          return res.status(400).json({erro: "nome e data de nascimento sao obrigatorios!"});
        }
        const novoEstudante = new Estudante(proximoId++,  nome, dataNascimento, telefone);
        estudantes.push(novoEstudante);
        return res.status(201).json(novoEstudante); 
    }
     static editar(req, res){
        const id = parseInt(req.params.id);
        const { nome, dataNascimento, telefone} = req.body;
        const index = estudantes.findIndex(e => e.id === id);
        if (index === -1){
            return res.status(404).json({erro: "estudante nao encontrado"});
        }
        estudantes[index].nome = nome || estudantes[index].nome;
        estudantes[index].dataNascimento = dataNascimento || estudantes[index].dataNascimento;
        estudantes[index].telefone = telefone || estudantes[index].telefone;
        return res.status(200).json(estudantes[index]);
    }
    
    static deletar(req, res){
        const id = parseInt(req.params.id);
        const index = estudantes.findIndex(e => e.id === id);
        if (index === -1){
            return res.status(404).json({erro: "estudante nao encontrado"});
        }
        const removido = estudantes.splice(index, 1);
        return res.status(200).json({
            mensagem: "Estudante removido com sucesso!",
            estudantes: removido[0]
        });  
    }    
}

module.exports = EstudanteController;

