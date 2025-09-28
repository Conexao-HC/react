import Cabecalho from "../../components/Cabecalho/Cabecalho";
import Rodape from "../../components/Rodape/Rodape";

function Contatos() {
  return (
    <div className="contatos">
      {" "}
      <Cabecalho />{" "}
      <section>
        {" "}
        <div className="retangulocontatos"></div>{" "}
        <div className="contatostitulo">CONTATOS</div>{" "}
        <div className="reatngulobody"></div>{" "}
        <a
          href="https://web-chat.global.assistant.watson.appdomain.cloud/preview.html?region=us-south&integrationID=83349a1a-13a7-448a-8156-fbdd2117c7b7&serviceInstanceID=5045756a-9470-44e1-a10d-d6f67bf59478"
          className="interajaassistente"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          Interaja com o nosso assistente virtual{" "}
        </a>{" "}
        <img
          className="fotorobo"
          src="/Challenge front-end/assets/img/assistente-de-robo.png"
          alt="Assistente Virtual"
        />{" "}
        <a
          className="sitehc"
          href="https://www.hc.fm.usp.br/hc/portal/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          Site do HC{" "}
        </a>{" "}
        <div className="redessociaisdohc">Redes Sociais do HC</div>{" "}
        <a
          href="https://www.instagram.com/hospitalhcfmusp/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <img
            className="instagramfoto"
            src="/Challenge front-end/assets/img/instagram.png"
            alt="Instagram"
          />{" "}
        </a>{" "}
        <a
          href="https://www.youtube.com/channel/UC_DUjcI35Hm0ix74KDQ67Jw/featured"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <img
            className="youtubefoto"
            src="/Challenge front-end/assets/img/youtube.png"
            alt="Youtube"
          />{" "}
        </a>{" "}
        <a
          href="https://www.facebook.com/hospitaldasclinicasdafmusp"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <img
            className="facebookfoto"
            src="/Challenge front-end/assets/img/facebook.png"
            alt="Facebook"
          />{" "}
        </a>{" "}
        <a
          href="https://x.com/hospitalHCFMUSP"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <img
            className="twitterfoto"
            src="/Challenge front-end/assets/img/twitter.png"
            alt="Twitter"
          />{" "}
        </a>{" "}
        <a
          href="https://www.linkedin.com/company/hcfmusp/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <img
            className="linkedin2"
            src="/Challenge front-end/assets/img/sinal-do-linkedin.png"
            alt="Linkedin"
          />{" "}
        </a>{" "}
        <img
          className="fototelefone"
          src="/Challenge front-end/assets/img/telefone.png"
          alt="Telefone"
        />{" "}
        <div className="numerohc">+55(11)2661-0000</div>{" "}
        <div className="telefonehc">Telefone do HC</div>{" "}
        <img
          className="fotoemail"
          src="/Challenge front-end/assets/img/o-email.png"
          alt="E-mail"
        />{" "}
        <div className="conexaohc-gmail-com">conexaohc@gmail.com</div>{" "}
        <div className="e-mail-do-conex-o-hc">E-mail do Conexão HC</div>{" "}
      </section>{" "}
      <Rodape />{" "}
    </div>
  );
}
export default Contatos;
