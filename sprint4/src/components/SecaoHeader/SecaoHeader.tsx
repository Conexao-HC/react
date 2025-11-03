import type { SecaoHeaderProps } from "../../types/secaoheader";

export default function SecaoHeader({ tituloPrincipal, tagSecundaria, corTag }: SecaoHeaderProps) {
    return (
        <div className="w-full max-w-lg bg-[#d9d9d9] p-4 rounded-lg shadow-xl mb-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-semibold text-black">{tituloPrincipal}</h2>
                <div className={`px-4 py-2 rounded-md shadow-md`} style={{ backgroundColor: corTag }}>
                    <span className="text-sm font-semibold text-black">{tagSecundaria}</span>
                </div>
            </div>
            
            <p className="text-sm font-semibold text-[#4c88cc]">
                Utilize este formulário para reagendar uma consulta. Lembre-se de verificar os dados.
            </p>
        </div>
    );
}