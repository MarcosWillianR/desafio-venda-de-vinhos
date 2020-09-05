import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface RenderListButtonProps {
  active: boolean;
}

export const Container = styled.header`
  height: 80px;
  width: 100%;
  background: #db4461;

  display: flex;
  align-items: center;
  justify-content: center;

  ul {
    padding: 12px 22px;
    display: flex;

    li + li {
      margin-left: 8px;
    }
  }

  > a {
    border: 0;
    background: 0;
    padding: 8px 22px;

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
`;

export const RenderListButton = styled.button<RenderListButtonProps>`
  border: 2px solid #3a3a59;
  padding: 8px 22px;
  background: transparent;
  color: #3a3a59;
  border-radius: 44px;

  font-size: 14px;
  font-weight: 700;

  transition: all 0.5s;

  ${props =>
    props.active &&
    css`
      border-color: transparent;
      background: #3a3a59;
      color: #fff;
    `}

  &:hover {
    border-color: transparent;
    background: #3a3a59;
    color: #fff;
  }
`;
