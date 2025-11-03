import { contatos } from "../../data/DataContatos";
import fotoTelefone from '../../assets/img/telefone.png'
import fotoEmail from '../../assets/img/o-email.png'
import fotoRobo from '../../assets/img/assistente-de-robo.png'


export default function Contatos() {
    
    const { contatoDados, redesSociais, corFundo, corBorda, titulo } = contatos;

    return (
        <div className="min-h-screen bg-white py-10">
            <div className="max-w-xl mx-auto px-4">
                
                <h1 
                    className="text-3xl font-medium text-center text-black mb-8 p-6 rounded-lg shadow-md border-2"
                    style={{ backgroundColor: corFundo, borderColor: corBorda }}
                >
                    {titulo}
                </h1>
                
                <div 
                    className="p-6 rounded-lg shadow-xl border-2 space-y-8"
                    style={{ backgroundColor: corFundo, borderColor: corBorda }}
                >
                    
                    <div className="flex flex-col space-y-6 border-b pb-6 border-gray-400">
                        
                        <a 
                            href={contatoDados.chatbotLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center space-x-4 text-2xl font-semibold text-black hover:text-blue-600 transition"
                        >
                            <img className="w-10 h-10 object-cover" src={fotoRobo} alt="Assistente Virtual" />
                            <span>Interaja com o nosso assistente virtual</span>
                        </a>

                        <a 
                            href={contatoDados.site} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-2xl font-semibold text-black hover:text-blue-600 transition pl-14"
                        >
                            Site do HC
                        </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b pb-6 border-gray-400">
                        
                        <div>
                            <p className="text-2xl font-semibold mb-1">Telefone do HC</p>
                            <div className="flex items-center space-x-3">
                                <img className="w-6 h-6 object-cover" src={fotoTelefone} alt="Telefone" />
                                <p className="text-lg font-semibold">{contatoDados.telefone}</p>
                            </div>
                        </div>

                        <div>
                            <p className="text-2xl font-semibold mb-1">E-mail do Conexão HC</p>
                            <div className="flex items-center space-x-3">
                                <img className="w-6 h-6 object-cover" src={fotoEmail} alt="E-mail" />
                                <p className="text-lg font-semibold">{contatoDados.email}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className="text-2xl font-semibold mb-4">Redes Sociais do HC</p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            {redesSociais.map((rede) => (
                                <a 
                                    key={rede.name}
                                    href={rede.url}
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="hover:opacity-75 transition"
                                >
                                    <img className="w-10 h-10" src={rede.img} alt={rede.name} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}