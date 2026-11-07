class Notas{
    constructor(id, matricula_id, disciplina_id, valor, tipoAvaliacao, dataLancamento){
        this.id = id;
        this.matricula_id = matricula_id;
        this.disciplina_id = disciplina_id;
        this.valor = valor;
        this.tipoAvaliacao = tipoAvaliacao;
        this.dataLancamento = dataLancamento;
    }
}
module.exports = Notas;