
import { Link } from "react-router-dom";

function Cabecalho() {
  return (
    <header>
      <div className="retangulocabecalho"></div>
      <img
        className="logohc"
        src="/assets/img/logohc.png"
        alt="logohc"
      />

      <Link to="/" className="home">
        Home
      </Link>

      <Link to="/faq" className="faq">
        FAQ
      </Link>

      <Link to="/sobre" className="sobrecabecalho">
        Sobre
      </Link>

      <Link to="/menu" className="trespontos">
        <img
          src="/assets/img/tres-pontos.png"
          alt="tres-pontos"
        />
      </Link>
    </header>
  );
}

export default Cabecalho;
