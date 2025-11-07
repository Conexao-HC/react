import { useState, useEffect } from 'react'; 
import { useForm } from 'react-hook-form';
import type { Lembrete, LembreteForm } from '../../types/lembretes';
import fotoLupa from '../../assets/img/lupa.png';
import fotoMensagem from '../../assets/img/balao-de-fala-com-linhas-de-texto.png';
import fotoCalendario from '../../assets/img/escreva.png'; 

const COR_FUNDO_BLOCO = '#d9d9d9';
const COR_TAG = '#acf0ff';
const COR_BORDA = '#1277bd';
const API_URL = "https://sprint4-quarkus.onrender.com"; 

export default function Lembretes() {
    
    const [lembretes, setLembretes] = useState<Lembrete[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState<Lembrete | null>(null);

    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        reset, 
    } = useForm<LembreteForm>();

    const usuarioJson = localStorage.getItem('usuarioLogado');
    let nomeUsuario = "Usuário"; 

    if (usuarioJson) {
        try {
            const usuario = JSON.parse(usuarioJson);
            nomeUsuario = usuario.nome || "Usuário"; 
        } catch (e) {
            console.error("Erro ao ler dados do usuário: ", e);
        }
    }

    const fetchLembretes = async () => {
        setIsLoading(true); 
        try {
            const response = await fetch(`${API_URL}/lembretes`);
            if (!response.ok) throw new Error('Falha ao buscar lembretes');
            const data = await response.json();
            setLembretes(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    
    useEffect(() => {
        fetchLembretes(); 
    }, []); 

    const onSubmit = async (data: LembreteForm) => {
        if (isEditing) {
            
            try {
                const response = await fetch(`${API_URL}/lembretes/${isEditing.idLembretes}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });

                if (!response.ok) throw new Error('Erro ao atualizar lembrete');
                
                alert(`Lembrete atualizado com sucesso!`);
                await fetchLembretes(); 
                
            } catch (error) {
                console.error(error);
                alert('Falha ao atualizar lembrete.');
            }

        } else {
            
            try {
                const response = await fetch(`${API_URL}/lembretes`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });

                if (!response.ok) throw new Error('Erro ao criar lembrete');
                
                alert(`Lembrete criado com sucesso!`);
                await fetchLembretes(); 

            } catch (error) {
                console.error(error);
                alert('Falha ao criar lembrete.'); 
            }
        }
        
        reset();
        setIsEditing(null);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Tem certeza que deseja excluir este lembrete?")) return;

        try {
            const response = await fetch(`${API_URL}/lembretes/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Falha ao deletar lembrete');
            
            setLembretes(listaAtual => listaAtual.filter(l => l.idLembretes !== id));
            alert("Lembrete deletado com sucesso!");
        } catch (error) {
            console.error(error);
            alert("Erro ao deletar lembrete.");
        }
    };
    
    const handleSelectEdit = (lembrete: Lembrete) => {
        setIsEditing(lembrete); 
        reset(lembrete); 
    };
    
    const handleCancelEdit = () => {
        setIsEditing(null);
        reset(); 
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
                
                <h3 className="text-xl font-semibold">
                    {isEditing ? `Editando Lembrete #${isEditing.idLembretes}` : "Criar Novo Lembrete"}
                </h3>

                
                <div>
                    <label htmlFor="meio" className="block text-sm font-bold text-gray-700">Método de recebimento</label>
                    <div className="relative mt-1">
                        <img src={fotoLupa} alt="Lupa" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 z-10 opacity-50" />
                        <select
                            id="meio"
                            className={`block w-full border rounded-lg shadow-sm pl-10 pr-3 py-3 focus:ring-blue-500 focus:border-blue-500 ${errors.meio ? 'border-red-500' : 'border-gray-700'}`}
                            style={{ borderColor: COR_BORDA }}
                            {...register("meio", { required: "O método é obrigatório."})}
                        >
                            <option value="">Selecione...</option>
                            <option value="SMS">SMS</option>
                            <option value="Email">Email</option>
                        </select>
                        {errors.meio && <small className="text-red-500 block mt-1">{errors.meio.message}</small>}
                    </div>
                </div>
                
                
                <div>
                    <label htmlFor="dataLembrete" className="block text-sm font-bold text-gray-700">Dia para receber o lembrete</label>
                    <div className="relative mt-1">
                        <img src={fotoCalendario} alt="Calendário" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 z-10 opacity-50" />
                        <input
                            id="dataLembrete"
                            type="date"
                            className={`block w-full border rounded-lg shadow-sm pl-10 pr-3 py-3 focus:ring-blue-500 focus:border-blue-500 ${errors.dataLembrete ? 'border-red-500' : 'border-gray-700'}`}
                            style={{ borderColor: COR_BORDA }}
                            {...register("dataLembrete", { required: "A data é obrigatória." })}
                        />
                        {errors.dataLembrete && <small className="text-red-500 block mt-1">{errors.dataLembrete.message}</small>}
                    </div>
                </div>

                
                <div>
                    <label htmlFor="mensagem" className="block text-sm font-bold text-gray-700">Mensagem do lembrete</label>
                    <div className="relative mt-1">
                        <img src={fotoMensagem} alt="Mensagem" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 z-10 opacity-50" />
                        <input
                            id="mensagem"
                            type="text"
                            placeholder="Mensagem do lembrete"
                            className={`block w-full border rounded-lg shadow-sm pl-10 pr-3 py-3 focus:ring-blue-500 focus:border-blue-500 ${errors.mensagem ? 'border-red-500' : 'border-gray-7impo0'}`}
                            style={{ borderColor: COR_BORDA }}
                            {...register("mensagem", { required: "A mensagem é obrigatória." })}
                        />
                        {errors.mensagem && <small className="text-red-500 block mt-1">{errors.mensagem.message}</small>}
                    </div>
                </div>

                
                <div className="flex gap-4 mt-8">
                    <button
                        type="submit"
                        className="w-full py-4 px-4 border border-transparent rounded-full shadow-lg text-xl font-semibold text-white bg-[#4c88cc] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
                    >
                        {isEditing ? "Salvar Alterações" : "Finalizar Lembrete"}
                    </button>

                    {isEditing && (
                        <button
                            type="button" 
                            onClick={handleCancelEdit}
                            className="w-full py-4 px-4 border border-gray-400 rounded-full shadow-lg text-xl font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition duration-150"
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            
            <div className="w-full max-w-lg space-y-4 bg-white p-6 rounded-lg shadow-xl mt-10">
                <h3 className="text-2xl font-semibold text-black">Lembretes Salvos</h3>
                {isLoading ? (
                    <p>Carregando lembretes...</p>
                ) : (
                    <ul className="space-y-3">
                        {lembretes.length === 0 ? (
                            <p className="text-gray-500">Nenhum lembrete cadastrado.</p>
                        ) : (
                            lembretes.map(lembrete => (
                                <li key={lembrete.idLembretes} className="p-3 bg-gray-100 rounded-lg flex justify-between items-center shadow-sm">
                                    <div>
                                        <span className="font-bold text-blue-600">{lembrete.meio}</span>
                                        <p className="text-gray-800">{lembrete.mensagem}</p>
                                        <small className="text-gray-500">{lembrete.dataLembrete}</small>
                                    </div>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => handleSelectEdit(lembrete)}
                                            className="text-blue-500 hover:text-blue-700 font-semibold"
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(lembrete.idLembretes)}
                                            className="text-red-500 hover:text-red-700 font-semibold"
                                        >
                                            Excluir
                                        </button>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                )}
            </div>

        </div>
    );
}