export type EnderecoForm = {
  logradouro: string;
  numero: number;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
};

export type CadastroForm = {
  nome: string;
  email: string;
  dataNascimento: string;
  telefone: string;
  cpf: string;
  senha?: string; 
  confirmarSenha?: string; 
  endereco: EnderecoForm; 
};