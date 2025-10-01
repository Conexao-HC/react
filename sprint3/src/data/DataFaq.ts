export type FaqItem = {
    id: number;
    pergunta: string;
    resposta: string;
};

export const faqData: FaqItem[] = [
    {
        id: 1,
        pergunta: "O que é o site Conexão HC e qual sua relação com o HC?",
        resposta: "O Conexão HC é um site de apoio criado para auxiliar pacientes e usuários do Hospital das Clínicas com informações práticas, orientações e facilitação de acesso a serviços. Não substituímos o site oficial do HC, mas atuamos como um complemento para tornar sua experiência mais simples e informativa."
    },
    {
        id: 2,
        pergunta: "Como entro em contato com o HC diretamente?",
        resposta: "No Conexão HC, disponibilizamos todos os telefones, redes sociais e canais de atendimento digital do HC atualizados para facilitar seu contato com as unidades ou setores desejados, basta só acessar a página de contatos."
    },
    {
        id: 3,
        pergunta: "Preciso ter cadastro para usar a Conexão HC?",
        resposta: "Sim. Para agendar ou remarcar consultas e utilizar todas as outras funcionalidades da plataforma, é necessário criar uma conta com login e senha."
    },
    {
        id: 4,
        pergunta: "Posso agendar consultas diretamente pela plataforma?",
        resposta: "Sim. Através do nosso sistema, você pode agendar consultas em unidades vinculadas ao HC, escolher especialidades disponíveis e acompanhar o status dos seus atendimentos."
    },
    {
        id: 5,
        pergunta: "Quem posso procurar se tiver problemas para acessar ou agendar?",
        resposta: "Nossa equipe de suporte está disponível via chat no site ou pela página de contatos disponível aqui para ajudar com questões técnicas, login, agendamento e uso da plataforma."
    },
];