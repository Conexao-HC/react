export type MenuItem = {
    label: string;
    route: string;
    action?: 'logout'; 
};

export const menuItems: MenuItem[] = [
    { label: "Meus dados", route: "/meusdados" },
    { label: "Agendar consulta", route: "/agendamento" },
    { label: "Reagendar consulta", route: "/reagendamento" },
    { label: "Lembretes", route: "/lembretes" },
    { label: "Atestado", route: "/atestado" },
    { label: "Plano de Saúde", route: "/planosaude" },
    { label: "Redefinir senha", route: "/esquecisenha" },
    { label: "Integrantes", route: "/integrantes" }, 
    { label: "Contatos", route: "/contatos" }
];