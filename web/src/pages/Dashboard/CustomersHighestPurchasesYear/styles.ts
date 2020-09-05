import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import webBackground from '../../../assets/web-background.png';

const loadingAnim = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

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

  header {
    height: 80px;
    width: 100%;
    background: #db4461;
    padding: 0 32px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    strong {
      font-size: 24px;
      font-weight: 400;
      letter-spacing: 1px;
    }

    a,
    button {
      border: 0;
      background: 0;

      display: flex;
      align-items: center;

      svg {
        transition: color 0.5s;
        width: 20px;
        height: 20px;
        color: #3a3a59;
      }

      &:hover svg {
        color: ${shade(0.3, '#3a3a59')};
      }
    }

    button svg {
      width: 32px;
      height: 32px;
    }
  }
`;

export const YearLoading = styled.div`
  width: 22.5px;
  height: 22.5px;
  border-radius: 50%;

  border: 2px solid #3a3a59;
  border-left-color: #db4461;

  animation: ${loadingAnim} 1s infinite linear;
`;

export const CustomersList = styled.div`
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
  grid-template-columns: repeat(3, minmax(100px, 1fr)) repeat(2, 1fr);
`;

export const CustomersListItem = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 1fr)) repeat(2, 1fr);
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

export const LoadingContainer = styled.div`
  width: 100%;
  height: calc(100% - 210px);

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Loading = styled.div`
  width: 45px;
  height: 45px;
  margin-bottom: 80px;
  border-radius: 50%;

  border: 4px solid #db4461;
  border-left-color: rgba(0, 0, 0, 0.2);

  animation: ${loadingAnim} 1s infinite linear;
`;
