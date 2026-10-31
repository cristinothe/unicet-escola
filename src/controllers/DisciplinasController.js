const db = require('../database/db');

class DisciplinasController {
  // Listar Todos
  static listarTodos(req, res) {
    db.all("SELECT * FROM disciplinas", [], (err, rows) => {
      if (err) return res.status(500).json({ erro: err.message });
      return res.status(200).json(rows);
    });
  }

  // Listar por ID
  static listarPorId(req, res) {
    const { id } = req.params;
    db.get("SELECT * FROM disciplinas WHERE id = ?", [id], (err, row) => {
      if (err) return res.status(500).json({ erro: err.message });
      if (!row) return res.status(404).json({ erro: "Disciplina não encontrada." });
      return res.status(200).json(row);
    });
  }

  // Salvar Disciplinas
  static salvar(req, res) {
    const { nome, codigo, cargaHoraria, curso_id } = req.body;
    if (!nome || !codigo) {
      return res.status(400).json({ erro: "Nome e codigo são obrigatórios." });
    }

    const sql = `INSERT INTO disciplinas (nome, codigo, cargaHoraria, curso_id) VALUES (?, ?, ?, ?)`;
    db.run(sql, [nome, codigo, cargaHoraria, curso_id], function(err) {
      if (err) return res.status(500).json({ erro: err.message });

      // this.lastID retorna o ID gerado pelo banco
      return res.status(201).json({
        id: this.lastID,
        nome,
        cargaHoraria,
        turno
      });
    });
  }

  // Editar Disciplinas
  static editar(req, res) {
    const { id } = req.params;
    const { nome, codigo, cargaHoraria, curso_id} = req.body;

    const sql = `UPDATE disciplinas SET nome = ?, codigo = ?, cargaHoraria = ?, curso_id = ? WHERE id = ?`;
    db.run(sql, [nome, codigo, cargaHoraria, curso_id, id], function(err) {
      if (err) return res.status(500).json({ erro: err.message });
      if (this.changes === 0) return res.status(404).json({ erro: "Disciplina não encontrada." });
      return res.status(200).json({ id, nome, cargaHoraria, turno });
    });
  }

  // Deletar Disciplinas
  static deletar(req, res) {
    const { id } = req.params;
    db.run("DELETE FROM disciplinas WHERE id = ?", [id], function(err) {
      if (err) return res.status(500).json({ erro: err.message });
      if (this.changes === 0) return res.status(404).json({ erro: "Disciplina não encontrada." });
      return res.status(200).json({ mensagem: "Disciplina removida com sucesso!" });
    });
  }
}
module.exports = DisciplinasController;
