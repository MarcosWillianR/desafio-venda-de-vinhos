import React from 'react';
import { Link } from 'react-router-dom';
import { FiLinkedin } from 'react-icons/fi';

import wineBottle from '../../assets/wine-bottle.png';

import {
  Container,
  MainContent,
  LeftContentContainer,
  Footer,
  RightContentContainer,
} from './styles';

const SignIn: React.FC = () => (
  <Container>
    <MainContent>
      <LeftContentContainer>
        <span>Wine</span>

        <h1>
          Faça
          <br />
          Login
        </h1>

        <Link to="/dashboard">Entrar agora</Link>

        <Footer>
          <p>Vamos nos conectar?</p>
          <span />

          <a
            href="https://www.linkedin.com/in/marcos-willian-977311188/"
            target="_blank"
            rel="noreferrer"
          >
            <FiLinkedin />
          </a>
        </Footer>
      </LeftContentContainer>

      <RightContentContainer>
        <img src={wineBottle} alt="wine-bottle" />

        <small>Conhece?</small>

        <h3>Um vinho de de Margaret River</h3>

        <h2>Single Vineyard Cabernet - Malbec 2014</h2>

        <p>
          Com suas florestas de karri e jarrah e um enorme estábulo de
          excelentes produtores, a costa oeste da Austrália Ocidental é uma joia
          australiana. Os melhores locais desta região em particular,
          principalmente em sua seção norte, estão localizados em cascalho de
          ironstone de drenagem livre, que mantém as vinhas lutando apenas o
          suficiente para garantir vinhos complexos e bem estruturados.
        </p>

        <Link to="/dashboard">Entrar agora</Link>
      </RightContentContainer>
    </MainContent>
  </Container>
);

export default SignIn;
