import type { Integrantes } from "../../data/DataIntegrantes";

type IntegrantesCardProps = {
    integrantes: Integrantes;
};

export default function IntegrantesCard({ integrantes }: IntegrantesCardProps) {
    const { nome, rm, turma, fotoPerfil, linkedinLink, githubLink } = integrantes;

    return (
        
        <div className="flex items-center space-x-6 p-4 border-b border-[#169da6]/50">
            
            
            <img 
                className="w-12 h-12 rounded-full object-cover border border-gray-400"
                src={fotoPerfil}
                alt={`Foto de perfil de ${nome}`}
            />
            
            
            <div className="text-sm font-medium text-black flex-grow">
                <p className="font-bold text-base">{nome}</p>
                <p>RM: {rm}</p>
                <p>{turma}</p>

                
                <div className="mt-2 flex space-x-3 text-xs">
                    <a 
                        href={linkedinLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="linkedinlink text-black hover:text-blue-600 transition"
                    >
                        LinkedIn
                    </a>
                    <span className="text-gray-400">|</span>
                    <a 
                        href={githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="github text-black hover:text-blue-600 transition"
                    >
                        GitHub
                    </a>
                </div>
            </div>
        </div>
    );
}