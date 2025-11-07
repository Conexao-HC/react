
export type ReagendamentoForm = {
  idConsultaAnterior: number;
  novaData: string;
  atendimentoMesmoMedico: string; // "Sim" ou "Não"
  motivoRetorno: string;
};


export type Reagendamento = {
  idReagendamento: number;
  idConsultaAnterior: number;
  novaData: string;
  atendimentoMesmoMedico: string;
  motivoRetorno: string;
};