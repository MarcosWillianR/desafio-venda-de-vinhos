import React, { useEffect, useState, useCallback } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import AllCustomersList from '../../components/AllCustomersList';
import CustomersHighestPurchasesYear from '../../components/CustomersHighestPurchasesYear';

import { Container, MainContent, RenderListButton } from './styles';

const Dashboard: React.FC = () => {
  const [currentListType, setCurrentListType] = useState(
    'customers-highest-purchases-year',
  );
  const [currentList, setCurrentList] = useState(<AllCustomersList />);

  useEffect(() => {
    let renderComponent = <AllCustomersList />;

    switch (currentListType) {
      case 'all-customers': {
        renderComponent = <AllCustomersList />;
        break;
      }
      case 'customers-highest-purchases-year': {
        renderComponent = <CustomersHighestPurchasesYear />;
        break;
      }
      default:
    }

    setCurrentList(renderComponent);
  }, [currentListType]);

  const handleSetCurrentListType = useCallback(
    listType => {
      if (listType !== currentListType) {
        setCurrentListType(listType);
      }
    },
    [currentListType],
  );

  return (
    <Container>
      <MainContent>
        <header>
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

        {currentList}
      </MainContent>
    </Container>
  );
};

export default Dashboard;
