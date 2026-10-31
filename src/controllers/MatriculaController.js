const db = require('../database/db');

class MatriculaController {
  // Listar Todos
  static listarTodos(req, res) {
    db.all("SELECT * FROM matricula", [], (err, rows) => {
      if (err) return res.status(500).json({ erro: err.message });
      return res.status(200).json(rows);
    });
  }

  // Listar por ID
  static listarPorId(req, res) {
    const { id } = req.params;
    db.get("SELECT * FROM matricula WHERE id = ?", [id], (err, row) => {
      if (err) return res.status(500).json({ erro: err.message });
      if (!row) return res.status(404).json({ erro: "matricula não encontrada." });
      return res.status(200).json(row);
    });
  }

  // Salvar Cursos
  static salvar(req, res) {
    const { estudante_id, curso_id, numeroMatricula, dataMatricula, status } = req.body;
    if (!nome || !codigo) {
      return res.status(400).json({ erro: "Nome e codigo são obrigatórios." });
    }

    const sql = `INSERT INTO matricula (estudante_id, curso_id, numeroMatricula, dataMatricula, status) VALUES (?, ?, ?, ?, ?)`;
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

  // Editar Curso
  static editar(req, res) {
    const { id } = req.params;
    const { estudante_id, curso_id, numeroMatricula, dataMatricula, status} = req.body;

    const sql = `UPDATE matricula SET estudante.id = ?, curso.id= ?, numeroMatricula = ?, datamatricula = ?, status = ? WHERE id = ?`;
    db.run(sql, [estudante_id, curso_id, numeroMatricula, dataMatricula, status, id], function(err) {
      if (err) return res.status(500).json({ erro: err.message });
      if (this.changes === 0) return res.status(404).json({ erro: "matricula não encontrada." });
      return res.status(200).json({ estudante_id, curso_id, numeroMatricula, dataMatricula, status });
    });
  }

  // Deletar curso
  static deletar(req, res) {
    const { id } = req.params;
    db.run("DELETE FROM matricula WHERE id = ?", [id], function(err) {
      if (err) return res.status(500).json({ erro: err.message });
      if (this.changes === 0) return res.status(404).json({ erro: "matricula não encontrada." });
      return res.status(200).json({ mensagem: "matricularemovida com sucesso!" });
    });
  }
}
module.exports = MatriculaController;
