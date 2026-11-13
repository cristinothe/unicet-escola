const db = require('../database/db');

class NotasController {
  // #swagger.tags = ['Notas']
  // #swagger.summary = 'Listar todas as Notas cadastrados'
  static listarTodos(req, res) {
    db.all("SELECT * FROM notas", [], (err, rows) => {
      if (err) return res.status(500).json({ erro: err.message });
      return res.status(200).json(rows);
    });
  }

  // #swagger.tags = ['Notas']
  // #swagger.summary = 'Listar Nota por Id'
  static listarPorId(req, res) {
    const { id } = req.params;
    db.get("SELECT * FROM notas WHERE id = ?", [id], (err, row) => {
      if (err) return res.status(500).json({ erro: err.message });
      if (!row) return res.status(404).json({ erro: "Aluno não encontrado." });
      return res.status(200).json(row);
    });
  }

  // #swagger.tags = ['Notas']
  // #swagger.summary = 'Salvar Nota cadastrada'
  static salvar(req, res) {
    const { matricula_id, disciplina_id, valor, tipoAvaliacao, dataLancamento} = req.body;
    if (!matricula_id|| !disciplina_id) {
      return res.status(400).json({ erro: "Maticula e disciplina são obrigatórios." });
    }
    if (valor < 0 || valor > 10) {
      return res.status(400).json({ erro: "A nota deve estar entre 0.0 e 10.0." });
    }
    const sql = `INSERT INTO notas (matricula_id, disciplina_id, valor, tipoAvaliacao, dataLancamento) VALUES (?, ?, ?, ?, ?)`;
    db.run(sql, [ matricula_id, disciplina_id, valor, tipoAvaliacao, dataLancamento ], function(err) {
      if (err) return res.status(500).json({ erro: err.message });

      // this.lastID retorna o ID gerado pelo banco
      return res.status(201).json({
        id: this.lastID,
         matricula_id, 
         disciplina_id, 
         valor, 
         tipoAvaliacao, 
         dataLancamento
      });
    });
  }

  // #swagger.tags = ['Notas']
  // #swagger.summary = 'Editar Nota'
  static editar(req, res) {
    const { id } = req.params;
    const { matricula_id, disciplina_id, valor, tipoAvaliacao, dataLancamento} = req.body;

    const sql = `UPDATE notas SET matricula.id = ?, disciplina.id= ?, valor = ?, tipoAvaliacao = ?, dataLancamento = ? WHERE id = ?`;
    if (valor < 0 || valor > 10) {
       return res.status(400).json({ erro: "A nota deve estar entre 0.0 e 10.0." });
      }

    db.run(sql, [matricula_id, disciplina_id, valor, tipoAvaliacao, dataLancamento, id], function(err) {
      if (err) return res.status(500).json({ erro: err.message });
      if (this.changes === 0) return res.status(404).json({ erro: "Nota não encontrada." });
      return res.status(200).json({ matricula_id, disciplina_id, valor, tipoAvaliacao, dataLancamento });
    });
  }

  // #swagger.tags = ['Notas']
  // #swagger.summary = 'Deletar Nota'
  static deletar(req, res) {
    const { id } = req.params;
    db.run("DELETE FROM notas WHERE id = ?", [id], function(err) {
      if (err) return res.status(500).json({ erro: err.message });
      if (this.changes === 0) return res.status(404).json({ erro: "Nota não encontrada." });
      return res.status(200).json({ mensagem: "Nota removida com sucesso!" });
    });
  }
}
module.exports = NotasController;
