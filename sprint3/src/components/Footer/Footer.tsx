export default function Footer() {
    
    const redesSociais = [
        { name: 'Instagram', src: '/Challenge front-end/assets/img/instagram.png', alt: 'Instagram', url: 'https://www.instagram.com' },
        { name: 'Youtube', src: '/Challenge front-end/assets/img/youtube.png', alt: 'Youtube', url: 'https://www.youtube.com' },
        { name: 'Facebook', src: '/Challenge front-end/assets/img/facebook.png', alt: 'Facebook', url: 'https://www.facebook.com' },
        { name: 'Twitter', src: '/Challenge front-end/assets/img/twitter.png', alt: 'Twitter', url: 'https://www.twitter.com' },
        { name: 'LinkedIn', src: '/Challenge front-end/assets/img/sinal-do-linkedin.png', alt: 'LinkedIn', url: 'https://www.linkedin.com' },
    ];
    
    return (
        <footer className="bg-[#acf0ff] text-black p-8 border-t border-black">
            
            <div className="rodape max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                
                <div>
                    <h3 className="text-xl font-semibold mb-2">Central de Atendimento</h3>
                    
                    <div className="flex items-center justify-center md:justify-start space-x-2 mt-4">
                        <img 
                            className="telefonelogo w-5 h-5" 
                            src="/Challenge front-end/assets/img/telefone.png" 
                            alt="Telefone" 
                        />
                        <p className="numerotelefone font-semibold text-lg">
                            +55 (11) 2661-0000
                        </p>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-4">Redes Sociais</h3>
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                        {redesSociais.map((link) => (
                            <a 
                                key={link.name} 
                                href={link.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                <img 
                                    className="w-6 h-6 hover:opacity-75 transition duration-150" 
                                    src={link.src} 
                                    alt={link.alt} 
                                />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="text-sm opacity-80 mt-4 md:mt-0 md:self-start">
                    <p>Copyright &copy; 2025. Todos os direitos reservados.</p>
                </div>
                
            </div>
        </footer>
    );
}