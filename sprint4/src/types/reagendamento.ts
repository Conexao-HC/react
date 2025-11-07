export type ReagendamentoForm = {
  idConsultaAnterior: number;
  novaData: string;
  atendimentoMesmoMedico: string; 
  motivoRetorno: string;
};

export type Reagendamento = {
  idReagendamento: number;
  idConsultaAnterior: number;
  novaData: string;
  atendimentoMesmoMedico: string;
  motivoRetorno: string;
};