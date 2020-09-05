import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

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
  height: calc(100% - 80px);

  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    text-align: center;
  }

  small {
    display: block;
    text-align: center;
    font-size: 10px;
    margin-top: 12px;
  }
`;

export const SelectButton = styled.button`
  width: 100%;

  border: 0;
  padding: 12px 26px;
  border-radius: 42px;
  background: #db4461;

  color: #fff;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;

  font-weight: 700;

  transition: background-color 0.5s;

  &:hover {
    background: ${shade(0.1, '#db4461')};
  }

  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }
`;

export const SelectWrapper = styled.div`
  margin: 22px 0;
  position: relative;
  display: flex;
  align-items: center;

  select {
    width: 100%;
    border: 0;
    padding: 12px 26px;
    border-radius: 42px;
    background: #3a3a59;
    border: 2px solid #db4461;

    color: #fff;
    text-align: center;
    text-decoration: none;
    font-size: 18px;
    appearance: none;
  }

  svg {
    position: absolute;
    right: 20px;
    width: 20px;
    height: 20px;
  }
`;

export const LoadingContainer = styled.div`
  width: 100%;
  margin: 35px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Loading = styled.div`
  width: 22.5px;
  height: 22.5px;
  border-radius: 50%;

  border: 2px solid #db4461;
  border-left-color: rgba(0, 0, 0, 0.2);

  animation: ${loadingAnim} 1s infinite linear;
`;
