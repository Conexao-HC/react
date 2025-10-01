const COR_FUNDO = '#acf0ff'; 
const COR_BORDA = '#169da6'; 

export default function Sobre() {
    
    const textoSobre = (
        <>
            No Conexão HC, acreditamos que cuidar da saúde deve ser fácil, acessível e seguro para todos. 
            Somos uma plataforma de auxílio médico online, criada para conectar você com profissionais de saúde qualificados, sempre que precisar, onde estiver.
            <br /><br />
            Nosso objetivo é oferecer orientação médica confiável, com agilidade e humanização. 
            Seja para tirar dúvidas, agendar uma consulta ou saber quando procurar um especialista, estamos aqui para te ajudar a tomar decisões mais conscientes sobre a sua saúde.
            <br /><br />
            O HC conta com uma equipe versátil de médicos, enfermeiros e especialistas, 
            prontos para oferecer atendimento personalizado, com ética, sigilo e empatia. Utilizamos a tecnologia para garantir segurança nas suas informações e praticidade no seu atendimento.
            <br /><br />
            Na dúvida, fale com a gente. Saúde é coisa séria, estamos aqui para ajudar no que for preciso.
        </>
    );

    return (
        <div className="min-h-screen bg-white py-10">
            <div className="max-w-xl mx-auto px-4">
                <h1 
                    className="text-3xl font-medium text-center text-black mb-8 p-6 rounded-lg shadow-md border-2"
                    style={{ backgroundColor: COR_FUNDO, borderColor: COR_BORDA }}
                >
                    SOBRE NÓS
                </h1>

                <div 
                    className="p-8 rounded-lg shadow-xl border-2"
                    style={{ backgroundColor: COR_FUNDO, borderColor: COR_BORDA }}
                >
                    <p className="text-xl font-medium text-black text-justify leading-relaxed">
                        {textoSobre}
                    </p>
                </div>
                
            </div>
        </div>
    );
}