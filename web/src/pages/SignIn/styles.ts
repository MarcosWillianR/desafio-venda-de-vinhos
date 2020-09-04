import styled from 'styled-components';
import { shade } from 'polished';

import webBackground from '../../assets/web-background.png';

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  background: url(${webBackground}) no-repeat;
  background-position: 50% 50%;
  background-size: cover;
  padding: 0 22px;

  display: flex;
`;

export const MainContent = styled.main`
  width: 100%;
  max-width: 1440px;

  box-shadow: 1px 1px 22px rgba(0, 0, 0, 0.3);

  display: flex;
  margin: 60px auto;

  @media screen and (max-width: 960px) {
    max-width: 500px;
    margin: 22px auto;
  }
`;

export const LeftContentContainer = styled.div`
  width: 100%;
  padding: 32px 42px;
  max-width: 450px;
  background: #3a3a59;

  display: flex;
  flex-direction: column;

  @media screen and (max-width: 960px) {
    max-width: 100%;
    align-items: center;
  }

  > span {
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 6px;
    color: #db4461;
  }

  h1 {
    margin: auto 42px auto 0;

    font-size: 84px;
    align-self: center;
    font-weight: 900;
    line-height: 1;

    @media screen and (max-width: 960px) {
      margin: auto 0;
      font-size: 64px;
    }

    &:after {
      content: '';
      margin-left: auto;
      margin-top: 22px;

      display: block;
      width: 60px;
      height: 3px;
      background: #fff;
    }
  }

  button {
    display: none;
    width: 250px;

    border: 0;
    padding: 16px 26px;
    border-radius: 42px;
    background: #db4461;

    color: #fff;
    text-transform: uppercase;

    font-weight: 700;

    transition: background-color 0.5s;

    &:hover {
      background: ${shade(0.1, '#db4461')};
    }

    @media screen and (max-width: 960px) {
      display: block;
      margin-bottom: 62px;
    }
  }
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;

  color: #db4461;

  p {
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 700;
  }

  span {
    width: 66px;
    height: 2px;
    margin: 0 12px;
    background: #db4461;
  }

  a {
    color: #db4461;
    transition: opacity 0.5s;
    position: relative;
    z-index: 999;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const RightContentContainer = styled.div`
  width: 100%;
  padding: 32px 126px 32px 168px;
  background: #db4461;
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 960px) {
    display: none;
  }

  img {
    position: absolute;
    left: -185px;
  }

  small {
    width: 100px;

    font-size: 12px;
    text-transform: none;
    text-align: center;
    font-weight: 700;

    padding: 6px 16px;
    border-radius: 22px;

    color: #db4461;
    background: #3a3a59;

    margin-bottom: 8px;
  }

  h3 {
    text-transform: uppercase;
    color: #3a3a59;
  }

  h2 {
    font-size: 22px;
    text-transform: uppercase;
    margin: 22px 0 32px 0;
  }

  p {
    max-width: 650px;
    line-height: 1.5;
  }

  button {
    width: 250px;
    margin-top: 60px;

    border: 0;
    padding: 16px 26px;
    border-radius: 42px;
    background: #3a3a59;

    color: #fff;
    text-transform: uppercase;

    font-weight: 700;

    transition: background-color 0.5s;

    &:hover {
      background: ${shade(0.1, '#3a3a59')};
    }
  }
`;
