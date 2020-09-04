import React, { useEffect, useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import AllCustomersList from '../../components/AllCustomersList';

import {
  Container,
  MainContent,
  RenderListButton,
  MainContentList,
  MainContentListItem,
} from './styles';

const Dashboard: React.FC = () => {
  const [currentList, setCurrentList] = useState('all-customers');
  const [currentRenderList, setCurrentRenderList] = useState(
    <AllCustomersList />,
  );

  useEffect(() => {
    let renderComponent = <AllCustomersList />;

    switch (currentList) {
      case 'all-customers': {
        renderComponent = <AllCustomersList />;
        break;
      }
      default:
    }

    setCurrentRenderList(renderComponent);
  }, [currentList]);

  return (
    <Container>
      <MainContent>
        <header>
          <ul>
            <li>
              <RenderListButton
                type="button"
                active={currentList === 'all-customers'}
              >
                todos os clientes
              </RenderListButton>
            </li>
            <li>
              <RenderListButton type="button" active={false}>
                clientes com maiores compras
              </RenderListButton>
            </li>
            <li>
              <RenderListButton type="button" active={false}>
                clientes fiéis
              </RenderListButton>
            </li>
            <li>
              <RenderListButton type="button" active={false}>
                recomendações de vinho
              </RenderListButton>
            </li>
          </ul>

          <Link to="/">
            <FiLogOut />
          </Link>
        </header>

        {currentRenderList}

        {/* <MainContentList>
          <strong>Nome</strong>
          <strong>cpf</strong>
          <strong>Valor total em compras</strong>

          <MainContentListItem>
            <span>Jonathan</span>
            <span>000.000.000-08</span>
            <span>{priceFormatter(3190.7000000000003)}</span>
          </MainContentListItem>
        </MainContentList> */}
      </MainContent>
    </Container>
  );
};

export default Dashboard;
