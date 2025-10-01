import IntegrantesCard from "../../components/IntegrantesCard/IntegrantesCard";
import { integrantesData } from "../../data/DataIntegrantes";


export default function Integrantes() {
    return (
        <div className="min-h-screen bg-white py-10">
            <div className="max-w-xl mx-auto px-4">
                
              
                <h1 className="text-3xl font-medium text-center text-black mb-8 p-6 bg-[#acf0ff] rounded-lg shadow-md border-2 border-[#169da6]">
                    INTEGRANTES
                </h1>
                
               
                <div className="bg-[#acf0ff] rounded-lg shadow-xl overflow-hidden border-2 border-[#169da6] divide-y divide-[#169da6]">
                    
                    
                    {integrantesData.map(integrante => (
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