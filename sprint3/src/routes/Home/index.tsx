import { Link } from 'react-router-dom';
import bannerHC from '../../assets/img/menuhc.png'
import fotoMedico from '../../assets/img/fotomedico.png'
import fotoIdoso from '../../assets/img/veio.png'


export default function Home() {
    return (
        <div className="w-full bg-white pb-20"> 
            
            <div className="max-w-xl mx-auto space-y-8 p-4"> 

                <div>
                    <div className="bg-[#afdeff] rounded-lg shadow-xl overflow-hidden">
                        <img 
                            className="w-full h-auto" 
                            src= {bannerHC} 
                            alt="Banner HC" 
                            
                        />
                    </div>
                </div>

                <section className="grid grid-cols-2 gap-4">
                    
                    <Link to="/agendamento" className="group border border-[#1277bd] rounded-lg p-3 flex justify-center items-center h-16 text-center hover:bg-blue-50 transition duration-150">
                        <span className="text-sm md:text-base font-medium text-black group-hover:text-blue-700">AGENDAR CONSULTA</span>
                    </Link>
                    
                    <Link to="/lembretes" className="group border border-[#1277bd] rounded-lg p-3 flex justify-center items-center h-16 text-center hover:bg-blue-50 transition duration-150">
                        <span className="text-sm md:text-base font-medium text-black group-hover:text-blue-700">LEMBRETES</span>
                    </Link>
                    
                    <Link to="/reagendamento" className="group border border-[#1277bd] rounded-lg p-3 flex justify-center items-center h-16 text-center hover:bg-blue-50 transition duration-150">
                        <span className="text-sm md:text-base font-medium text-black group-hover:text-blue-700">REMARCAR CONSULTA</span>
                    </Link>

                    <Link to="/meusdados" className="group border border-[#1277bd] rounded-lg p-3 flex justify-center items-center h-16 text-center hover:bg-blue-50 transition duration-150">
                        <span className="text-sm md:text-base font-medium text-black group-hover:text-blue-700">MEUS DADOS</span>
                    </Link>
                </section>

                <section className="mt-10 p-6 flex flex-col md:flex-row items-center bg-gradient-to-t from-white to-[#4c88cc]/50 rounded-lg shadow-lg">
                    
                    <div className="w-full md:w-1/2 flex justify-center md:order-2">
                        <img 
                            className="w-48 h-auto rounded shadow-lg object-cover mb-4 md:mb-0" 
                            src= {fotoMedico} 
                            alt="Foto do Médico" 
                        />
                    </div>

                    <div className="text-col w-full md:w-1/2 p-2 md:order-1">
                        <p className="font-semibold text-sm text-center md:text-left">
                            Se possuir dificuldades para criar sua conta ou agendar uma consulta, não se preocupe. Nossa equipe está à disposição para ajudar com todo o cuidado e atenção que você merece. Entre em contato conosco e teremos prazer em auxiliá-lo no que for necessário.
                        </p>
                    </div>
                </section>
                
                <section className="p-6 bg-gradient-to-b from-[#4c88cc] to-[#acf0ff] rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-2">Serviços feitos para você</h2>
                    <p className="text-sm font-normal mb-6">
                        Aqui, a sua saúde é a nossa prioridade e está sempre em primeiro lugar, porque cuidar de você é o que nos move todos os dias.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
                        <img 
                            className="w-32 h-auto rounded-lg border border-black" 
                            src={fotoIdoso} 
                            alt="Foto Idoso" 
                        />
                        <Link to="/contatos" className="border border-[#1277bd] rounded-lg px-6 py-3 bg-white hover:bg-blue-50 text-base font-medium transition duration-150 shadow-md">
                            Nossos contatos
                        </Link>
                    </div>
                </section>

            </div>
        </div>
    );
}