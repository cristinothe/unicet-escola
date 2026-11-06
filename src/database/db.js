const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Cria ou abre o arquivo escola.db na raiz do projeto
const dbPath = path.resolve(__dirname, '../escola.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite com sucesso.');
  }
});

// Inicializa as tabelas do banco de dados em um único bloco
db.serialize(() => {
  // Tabela de Estudantes
  db.run(`
    CREATE TABLE IF NOT EXISTS estudantes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      dataNascimento TEXT NOT NULL,
      telefone TEXT
    )
  `);

  // Tabela de Cursos
  db.run(`
    CREATE TABLE IF NOT EXISTS cursos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      cargaHoraria INTEGER,
      turno TEXT
    )
  `);

  // Tabela de Disciplinas (Sintaxe de FK corrigida)
  db.run(`
    CREATE TABLE IF NOT EXISTS disciplinas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      codigo TEXT NOT NULL UNIQUE,
      cargaHoraria INTEGER,
      curso_id INTEGER NOT NULL,
      FOREIGN KEY (curso_id) REFERENCES cursos(id)
    )
  `);

  // Tabela de Matrículas (Sintaxe de FK corrigida)
  
db.run(`
CREATE TABLE IF NOT EXISTS matriculas (
     id INTEGER PRIMARY KEY AUTOINCREMENT, 
     estudante_id INTEGER NOT NULL,
     curso_id INTEGER NOT NULL, 
     numeroMatricula TEXT NOT NULL UNIQUE,
     dataMatricula TEXT NOT NULL, 
     status TEXT DEFAULT 'ATIVA',
     FOREIGN KEY (estudante_id) REFERENCES estudantes(id),
     FOREIGN KEY (curso_id) REFERENCES cursos(id)
)`);
});

module.exports = db;