import styled from 'styled-components';
import webBackground from '../../assets/web-background.png';

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  background: url(${webBackground}) no-repeat;
  background-position: 50% 50%;
  background-size: cover;
  padding: 0 22px;

  position: relative;

  display: flex;
`;

export const MainContent = styled.main`
  width: 100%;
  max-width: 1440px;

  box-shadow: 1px 1px 22px rgba(0, 0, 0, 0.3);
  background: #3a3a59;

  margin: 60px auto;
`;

export const MainContentList = styled.div`
  width: 100%;
  max-height: calc(100% - 60px);
  overflow-y: auto;
  padding: 22px 32px;

  background: #3a3a59;
  text-align: center;

  strong {
    margin-bottom: 22px;
    padding: 22px;
  }

  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 1fr));
`;

export const MainContentListItem = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 1fr));
  align-items: center;
  height: 56px;

  & + div {
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    margin-top: 12px;
    padding-top: 12px;
  }

  &:last-of-type {
    margin-bottom: 12px;
  }
`;
