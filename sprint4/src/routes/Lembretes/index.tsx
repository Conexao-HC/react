import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type { LembreteForm } from '../../types/lembretes';
import fotoLupa from '../../assets/img/lupa.png'
import fotoEscreve from '../../assets/img/escreva.png'
import fotoPessoa from '../../assets/img/pessoa.png'
import fotoMensagem from '../../assets/img/balao-de-fala-com-linhas-de-texto.png'


const COR_FUNDO_BLOCO = '#d9d9d9';
const COR_TAG = '#acf0ff';
const COR_BORDA = '#1277bd';

export default function Lembretes() {
    
    const { 
        register, 
        handleSubmit, 
        formState: { errors },
    } = useForm<LembreteForm>();

    const navigate = useNavigate();
    const usuarioJson = localStorage.getItem('usuarioCadastrado');
    let nomeUsuario = "Usuário"; 

    if (usuarioJson) {
        try {
            const usuario = JSON.parse(usuarioJson);
            
            nomeUsuario = usuario.nome || "Usuário"; 
        } catch (e) {
            
            console.error("Erro ao ler dados do usuário: ", e);
        }
    }

    const onSubmit = (data: LembreteForm) => {
        alert(`Lembrete configurado para a consulta ${data.metodoLembrete}. Mensagem: ${data.mensagemLembrete}.`);
        navigate('/home');
    };

    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-gray-50 py-10">
            
            <div 
                className="w-full max-w-lg p-4 rounded-lg shadow-xl mb-8"
                style={{ backgroundColor: COR_FUNDO_BLOCO }}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl font-semibold text-black">Olá {nomeUsuario}!</h2>
                    <div 
                        className="px-4 py-2 rounded-md shadow-md"
                        style={{ backgroundColor: COR_TAG }}
                    >
                        <span className="text-sm font-semibold text-black">LEMBRETES</span>
                    </div>
                </div>
                
                <p className="text-sm font-semibold text-[#4c88cc] text-center">
                    Essa é a área de LEMBRETES, aqui você poderá escolher o lembrete da sua consulta, e como vai recebê-lo, basta informar alguns dados e pronto.
                </p>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg space-y-6 bg-white p-6 rounded-lg shadow-xl">
                
                <div>
                    <label htmlFor="codigoConsulta" className="block text-sm font-bold text-gray-700">Método de recebimento</label>
                    <div className="relative mt-1">
                        <img src={fotoLupa} alt="Lupa" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 z-10 opacity-50" />
                        <input
                            id="metodoLembrete"
                            type="text"
                            placeholder="(SMS, E-MAIL)"
                            className={`block w-full border rounded-lg shadow-sm pl-10 pr-3 py-3 focus:ring-blue-500 focus:border-blue-500 ${errors.metodoLembrete ? 'border-red-500' : 'border-gray-700'}`}
                            style={{ borderColor: COR_BORDA }}
                            {...register("metodoLembrete", { required: "O método é obrigatório."})}
                        />
                        {errors.metodoLembrete && <small className="text-red-500 block mt-1">{errors.metodoLembrete.message}</small>}
                    </div>
                </div>
                
                <div>
                    <label htmlFor="paciente" className="block text-sm font-bold text-gray-700">Informe o especialista</label>
                    <div className="relative mt-1">
                        <img src={fotoPessoa} alt="Pessoa" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 z-10 opacity-50" />
                        <input
                            id="paciente"
                            type="text"
                            placeholder="Especialidade"
                            className={`block w-full border rounded-lg shadow-sm pl-10 pr-3 py-3 focus:ring-blue-500 focus:border-blue-500 ${errors.paciente ? 'border-red-500' : 'border-gray-700'}`}
                            style={{ borderColor: COR_BORDA }}
                            {...register("paciente", { required: "O nome do paciente é obrigatório." })}
                        />
                        {errors.paciente && <small className="text-red-500 block mt-1">{errors.paciente.message}</small>}
                    </div>
                </div>

                <div>
                    <label htmlFor="dataLembrete" className="block text-sm font-bold text-gray-700">Dia para receber o lembrete</label>
                    <div className="relative mt-1">
                        <img src={fotoEscreve} alt="Lápis" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 z-10 opacity-50" />
                        <input
                            id="dataLembrete"
                            type="date"
                            placeholder="Data de recebimento"
                            className={`block w-full border rounded-lg shadow-sm pl-10 pr-3 py-3 focus:ring-blue-500 focus:border-blue-500 ${errors.dataLembrete ? 'border-red-500' : 'border-gray-700'}`}
                            style={{ borderColor: COR_BORDA }}
                            {...register("dataLembrete", { required: "A data é obrigatória." })}
                        />
                        {errors.dataLembrete && <small className="text-red-500 block mt-1">{errors.dataLembrete.message}</small>}
                    </div>
                </div>

                <div>
                    <label htmlFor="mensagemLembrete" className="block text-sm font-bold text-gray-700">Mensagem do lembrete</label>
                    <div className="relative mt-1">
                        <img src={fotoMensagem} alt="Mensagem" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 z-10 opacity-50" />
                        <input
                            id="mensagemLembrete"
                            type="text"
                            placeholder="Mensagem do lembrete"
                            className={`block w-full border rounded-lg shadow-sm pl-10 pr-3 py-3 focus:ring-blue-500 focus:border-blue-500 ${errors.mensagemLembrete ? 'border-red-500' : 'border-gray-700'}`}
                            style={{ borderColor: COR_BORDA }}
                            {...register("mensagemLembrete", { required: "A mensagem é obrigatória." })}
                        />
                        {errors.mensagemLembrete && <small className="text-red-500 block mt-1">{errors.mensagemLembrete.message}</small>}
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-4 px-4 border border-transparent rounded-full shadow-lg text-xl font-semibold text-white bg-[#4c88cc] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 mt-8"
                >
                    Finalizar Lembrete
                </button>
            </form>
        </div>
    );
}