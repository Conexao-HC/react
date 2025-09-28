

function Cadastro() {
  return (
    <main className="cadastro">
      <header>
        <div className="paginacadastro"></div>
        <div className="cabecalho">
          <img
            className="logohc"
            src="/Challenge front-end/assets/img/logohc.png"
            alt="Logo HC"
          />
          <button
            className="vector"
            onClick={() => (window.location.href = "/login")}
          >
            <img
              src="/Challenge front-end/assets/img/seta-esquerda.png"
              alt="seta-esquerda"
            />
          </button>
        </div>
      </header>

      <form>
        <div className="retangulofazercadastro"></div>
        <h1 className="fazercadastro">Fazer um cadastro</h1>

        <div className="coloqueinformacoes">Coloque as seguintes informações</div>

        <div className="retangulonome"></div>
        <input
          type="text"
          className="nome"
          placeholder="Nome"
          style={{ border: "none", outline: "none" }}
        />

        <div className="retanguloemail"></div>
        <input
          type="email"
          className="coloqueemail"
          placeholder="Digite seu email"
          style={{ border: "none", outline: "none" }}
        />

        <div className="retangulocriesenha"></div>
        <input
          type="password"
          className="criesenha"
          placeholder="Crie uma senha"
          style={{ border: "none", outline: "none" }}
        />

        <div className="retanguloconfirmesenha"></div>
        <input
          type="password"
          className="confirmesenha"
          placeholder="Confirme sua senha"
          style={{ border: "none", outline: "none" }}
        />

        <div className="retangulodata"></div>
        <input
          type="text"
          className="datanascimento"
          placeholder="Data de nascimento"
          style={{ border: "none", outline: "none" }}
          pattern="^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/([0-9]{4})$"
        />

        <div className="retangulotel"></div>
        <input
          type="tel"
          className="telefone"
          placeholder="Telefone"
          style={{ border: "none", outline: "none" }}
        />

        <div className="retangulocpf"></div>
        <input
          type="text"
          className="cpf"
          placeholder="CPF"
          style={{ border: "none", outline: "none" }}
        />

        <div className="retangulofinalizado"></div>
        <button
          type="submit"
          className="finalizado"
          id="finalizadoBtn"
          style={{ backgroundColor: "transparent", border: "none" }}
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "/login";
          }}
        >
          Finalizado
        </button>
      </form>

      
    </main>
  );
}

export default Cadastro;

