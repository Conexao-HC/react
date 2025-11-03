import fotoEnzo from '../../assets/img/enzo.png';
import fotoLucas from '../../assets/img/fuka.png';
import IntegrantesCard from '../../components/IntegrantesCard/IntegrantesCard';
import { integrantesData } from '../../data/DataIntegrantes';

const COR_FUNDO = '#acf0ff';
const COR_BORDA = '#169da6'; 

const map: { [key: string]: string } = {
    "enzo.png": fotoEnzo,
    "fuka.png": fotoLucas,
};


export default function Sobre() {
    
    const imagens = integrantesData.map(integrante => ({
        ...integrante,
        fotoPerfil: map[integrante.fotoPerfil] || '', 
    }));


    return (
        <div className="min-h-screen bg-white py-10">
            <div className="max-w-xl mx-auto px-4">
                
                <h1 
                    className="text-3xl font-medium text-center text-black mb-8 p-6 rounded-lg shadow-md border-2"
                    style={{ backgroundColor: COR_FUNDO, borderColor: COR_BORDA }}
                >
                    INTEGRANTES
                </h1>
                
                <div 
                    className="p-8 rounded-lg shadow-xl border-2 divide-y divide-[#169da6]"
                    
                    style={{ backgroundColor: COR_FUNDO, borderColor: COR_BORDA }}
                >
                    
                    {imagens.map(integrante => (
                        <IntegrantesCard 
                            key={integrante.id} 
                            integrantes={integrante}
                        />
                    ))}
                    
                </div>
            </div>
        </div>
    );
}