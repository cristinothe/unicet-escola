class Matricula{
    constructor(id, estudante_id, curso_id, numeroMatricula, dataMatricula, status){
        this.id = id;
        this.estudante_id = estudante_id;
        this.curso_id = curso_id;
        this.numeroMatricula = numeroMatricula;
        this.dataMatricula = dataMatricula;
        this.status = status;
    }
}
module.exports = Matricula;