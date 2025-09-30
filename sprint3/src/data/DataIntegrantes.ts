export type Integrantes = {
    id: number;
    nome: string;
    rm: string;
    turma: string;
    avatarSrc: string;
    linkedinUrl: string;
    githubUrl: string;
};

export const integrantesData: Integrantes[] = [
    {
        id: 1,
        nome: "Enzo Vaz",
        rm: "561702",
        turma: "1TDSPF",
        fotoPerfil: "/Challenge front-end/assets/img/bolaenzo.png",
        linkedinLink: "https://www.linkedin.com/in/enzo-vaz-740a33330/",
        githubLink: "https://github.com/EnzoVazz",
    },
    {
        id: 2,
        nome: "Lucas Ryuji Fukuda",
        rm: "562152",
        turma: "1TDSPF",
        fotoPerfil: "/Challenge front-end/assets/img/bolafuka.png",
        linkedinUrl: "https://www.linkedin.com/in/lucas-ryuji-fukuda-020876353/",
        githubUrl: "https://github.com/LucasFukuda2408",
    },
];