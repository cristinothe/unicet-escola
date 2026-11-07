const db = require('../database/db');

class ProfessoresController {
  // Listar Todos
  static listarTodos(req, res) {
    db.all("SELECT * FROM professores", [], (err, rows) => {
      if (err) return res.status(500).json({ erro: err.message });
      return res.status(200).json(rows);
    });
  }

  // Listar por ID
  static listarPorId(req, res) {
    const { id } = req.params;
    db.get("SELECT * FROM professores WHERE id = ?", [id], (err, row) => {
      if (err) return res.status(500).json({ erro: err.message });
      if (!row) return res.status(404).json({ erro: "Professor não encontrado." });
      return res.status(200).json(row);
    });
  }

  // Salvar Professor
  static salvar(req, res) {
    const { nome, email, titulacao, telefone } = req.body;
    if (!nome || !email) {
      return res.status(400).json({ erro: "Nome e email são obrigatórios." });
    }

    const sql = `INSERT INTO professores (nome, email, titulacao, telefone) VALUES (?, ?, ?, ?)`;
    db.run(sql, [nome, email, titulacao, telefone], function(err) {
      if (err) return res.status(500).json({ erro: err.message });

      // this.lastID retorna o ID gerado pelo banco
      return res.status(201).json({
        id: this.lastID,
        nome, 
        email, 
        titulacao, 
        telefone
      });
    });
  }

  // Editar Professor
  static editar(req, res) {
    const { id } = req.params;
    const { nome, email, titulacao, telefone } = req.body;

    const sql = `UPDATE professores SET nome = ?, email = ?, titulacao = ?,telefone = ? WHERE id = ?`;
    db.run(sql, [nome, email, titulaçao, telefone], function(err) {
      if (err) return res.status(500).json({ erro: err.message });
      if (this.changes === 0) return res.status(404).json({ erro: "Professor não encontrado." });
      return res.status(200).json({ nome, email, titulacao, telefone });
    });
  }

  // Deletar Professor
  static deletar(req, res) {
    const { id } = req.params;
    db.run("DELETE FROM professores WHERE id = ?", [id], function(err) {
      if (err) return res.status(500).json({ erro: err.message });
      if (this.changes === 0) return res.status(404).json({ erro: "Professor não encontrado." });
      return res.status(200).json({ mensagem: "Professor removido com sucesso!" });
    });
  }
}
module.exports = ProfessoresController;
