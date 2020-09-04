import styled, { keyframes } from 'styled-components';

const loadingAnim = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
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

    &:last-of-type {
      padding-left: 0;
      text-align: left;
    }
  }

  display: grid;
  grid-template-columns: repeat(2, minmax(100px, 250px)) minmax(100px, 1fr);
`;

export const CustomersListItem = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(2, minmax(100px, 250px)) minmax(100px, 1fr);
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

  div {
    span {
      cursor: default;
      padding: 4px 8px;
      border: 1px solid #db4461;
      border-radius: 22px;
      font-size: 10px;
      font-weight: 700;

      & + span {
        margin-left: 8px;
      }

      transition: all 0.5s;

      &:hover {
        background-color: #db4461;
        border-color: #3a3a59;
      }
    }
    display: flex;
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
