class Turmas{
    constructor(id, codigoTurma, semestre, horario, disciplina_id, professor_id){
        this.id = id;
        this.codigoTurma = codigoTurma;
        this.semestre = semestre;
        this.horario = horario;
        this.disciplina_id = disciplina_id;
        this.professor_id = professor_id;
    }
}
module.exports = Turmas;