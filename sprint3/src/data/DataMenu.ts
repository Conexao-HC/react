export type MenuItem = {
    label: string;
    route: string;
    action?: 'logout'; 
};

export const menuItems: MenuItem[] = [
    { label: "Meus dados", route: "/dados" },
    { label: "Agendar consulta", route: "/agendamento" },
    { label: "Reagendar consulta", route: "/reagendamento" },
    { label: "Avaliação", route: "/avaliacao" },
    { label: "Lembretes", route: "/lembretes" },
    { label: "Redefinir senha", route: "/esqueci-senha" },
    { label: "Integrantes", route: "/integrantes" }, 
    { label: "Contatos", route: "/contatos" }
];