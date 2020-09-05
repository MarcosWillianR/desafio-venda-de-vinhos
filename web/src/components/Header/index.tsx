import React, { useCallback, useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Container, RenderListButton } from './styles';

interface HeaderProps {
  renderCurrentList(currentListType: string): void;
}

const Header: React.FC<HeaderProps> = ({ renderCurrentList }) => {
  const [currentListType, setCurrentListType] = useState('all-customers');

  const handleSetCurrentListType = useCallback(
    listType => {
      if (listType !== currentListType) {
        setCurrentListType(listType);
        renderCurrentList(listType);
      }
    },
    [currentListType, renderCurrentList],
  );

  return (
    <Container>
      <ul>
        <li>
          <RenderListButton
            type="button"
            active={currentListType === 'all-customers'}
            onClick={() => handleSetCurrentListType('all-customers')}
          >
            todos os clientes
          </RenderListButton>
        </li>
        <li>
          <RenderListButton
            type="button"
            active={currentListType === 'customers-highest-purchases-year'}
            onClick={() =>
              handleSetCurrentListType('customers-highest-purchases-year')
            }
          >
            clientes com maiores compras
          </RenderListButton>
        </li>
        <li>
          <RenderListButton
            type="button"
            active={currentListType === 'most-faithful'}
            onClick={() => handleSetCurrentListType('most-faithful')}
          >
            clientes fiéis
          </RenderListButton>
        </li>
        <li>
          <RenderListButton
            type="button"
            active={currentListType === 'wines-recommendations'}
            onClick={() => handleSetCurrentListType('wines-recommendations')}
          >
            recomendações de vinho
          </RenderListButton>
        </li>
      </ul>

      <Link to="/">
        <FiLogOut />
      </Link>
    </Container>
  );
};

export default Header;
