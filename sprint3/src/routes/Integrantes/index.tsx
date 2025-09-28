import Cabecalho from "../../components/Cabecalho/Cabecalho";
import Rodape from "../../components/Rodape/Rodape";

function Integrantes() {
  return (
    <div className="integrantes">
    <Cabecalho/>

      <section>
        <div className="retangulointegrantes"></div>
        <div className="integrantes2">INTEGRANTES</div>
        <div className="retangulobody"></div>

        <img
          className="bolafuka"
          src="/assets/img/Ellipse 71.png"
          alt="Lucas"
        />
        <img
          className="bolaenzo"
          src="/assets/img/Ellipse 70 (1).png"
          alt="Enzo"
        />

        <div className="guilhermetexto">
          Guilherme Vieira
          <br />
          RM: XXXXX
          <br />
          1TDSPF
          <br />
          <a
            className="linkedinlink"
            href="https://www.linkedin.com/in/guilherme-vieira-84b837367/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Linkedin
          </a>
          <br />
          <a
            className="github"
            href="https://github.com/GuilhermeHidekii"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </div>

        <div className="lucastexto">
          Lucas Ryuji Fukuda
          <br />
          RM: 562152
          <br />
          1TDSPF
          <br />
          <a
            className="linkedinlink"
            href="https://www.linkedin.com/in/lucas-ryuji-fukuda-020876353/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Linkedin
          </a>
          <br />
          <a
            className="github"
            href="https://github.com/LucasFukuda2408"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </div>

        <div className="enzotexto">
          Enzo Vaz
          <br />
          RM: 561702
          <br />
          1TDSPF
          <br />
          <a
            className="linkedinlink"
            href="https://www.linkedin.com/in/enzo-vaz-740a33330/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Linkedin
          </a>
          <br />
          <a
            className="github"
            href="https://github.com/EnzoVazz"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </div>
      </section>

      <Rodape/>
    </div>
  );
}

export default Integrantes;

