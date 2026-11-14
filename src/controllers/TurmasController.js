const db = require('../database/db');

class TurmasController {
  // #swagger.tags = ['TURMA']
  // #swagger.summary = 'Listar todos as turmas cadastrados'
  static listarTodos(req, res) {
    db.all(`SELECT turmas.*, 
             disciplinas.nome AS nomeDisciplina, 
             professores.nome AS nomeProfessor 
      FROM turmas 
      INNER JOIN disciplinas ON turmas.disciplina_id = disciplinas.id 
      INNER JOIN professores ON turmas.professor_id = professores.id`, [], (err, rows) => {
      if (err) return res.status(500).json({ erro: err.message });
      return res.status(200).json(rows);
    });
  }

  // #swagger.tags = ['TURMAS']
  // #swagger.summary = 'Listar turma por Id'
  static listarPorId(req, res) {
    const { id } = req.params;
    db.get(`SELECT turmas.*, 
             disciplinas.nome AS nomeDisciplina, 
             professores.nome AS nomeProfessor 
      FROM turmas 
      INNER JOIN disciplinas ON turmas.disciplina_id = disciplinas.id 
      INNER JOIN professores ON turmas.professor_id = professores.id 
      WHERE turmas.id = ?`, [id], (err, row) => {
      if (err) return res.status(500).json({ erro: err.message });
      if (!row) return res.status(404).json({ erro: "Curso não encontrado." });
      return res.status(200).json(row);
    });
  }

  // #swagger.tags = ['TURMAS']
  // #swagger.summary = 'Salvar curso cadastrado'
  static salvar(req, res) {
    const {codigoTurma, semestre, horario, disciplina_id, professor_id } = req.body;
    if (!codigoTurma || !semestre) {
      return res.status(400).json({ erro: "codigo da Turma e semestre são obrigatórios." });
    }

    const sql = `INSERT INTO turmas (codigoTurma, semestre, horario, disciplina_id, professor_id) VALUES (?, ?, ?, ?, ?)`;
    db.run(sql, [codigoTurma, semestre, horario, disciplina_id, professor_id], function(err) {
      if (err) return res.status(500).json({ erro: err.message });

      // this.lastID retorna o ID gerado pelo banco
      return res.status(201).json({
        id: this.lastID,
        codigoTurma, 
        semestre, 
        horario, 
        disciplina_id, 
        professor_id
      });
    });
  }

  // #swagger.tags = ['TURMAS']
  // #swagger.summary = 'Editar turma'
  static editar(req, res) {
    const { id } = req.params;
    const {codigoTurma, semestre, horario, disciplina_id, professor_id } = req.body;

    const sql = `UPDATE turmas SET codigoTurma = ?, semestre = ?, horario = ?, disciplina_id = ?, professor_id = ? WHERE id = ?`;
    db.run(sql, [codigoTurma, semestre, horario, disciplina_id, professor_id, id], function(err) {
      if (err) return res.status(500).json({ erro: err.message });
      if (this.changes === 0) return res.status(404).json({ erro: "Turma não encontrado." });
      return res.status(200).json({ codigoTurma, semestre, horario, disciplina_id, professor_id});
    });
  }

  // #swagger.tags = ['TURMA']
  // #swagger.summary = 'Deletar turma'
  static deletar(req, res) {
    const { id } = req.params;
    db.run("DELETE FROM turmas WHERE id = ?", [id], function(err) {
      if (err) return res.status(500).json({ erro: err.message });
      if (this.changes === 0) return res.status(404).json({ erro: "turma não encontrado." });
      return res.status(200).json({ mensagem: "turma removida com sucesso!" });
    });
  }
}
module.exports = TurmasController;
