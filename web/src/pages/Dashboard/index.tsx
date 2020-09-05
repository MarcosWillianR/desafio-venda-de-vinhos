import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import AllCustomersList from '../../components/AllCustomersList';
import CustomersHighestPurchasesYearList from '../../components/CustomersHighestPurchasesYearList';
import MostFaithfulCustomersList from '../../components/MostFaithfulCustomersList';

import Header from '../../components/Header';
import { Select } from '../../components/Form';

import { Container, MainContent } from './styles';

const Dashboard: React.FC = () => {
  const { push } = useHistory();
  const [currentList, setCurrentList] = useState(<AllCustomersList />);

  const handleSelectedCustomer = useCallback(
    (customerCpf: string) => {
      push(`/dashboard/wines/recommendation/${customerCpf}`);
    },
    [push],
  );

  const handleRenderCurrentList = useCallback(currentListType => {
    let renderComponent = <AllCustomersList />;

    switch (currentListType) {
      case 'all-customers': {
        renderComponent = <AllCustomersList />;
        break;
      }
      case 'customers-highest-purchases-year': {
        renderComponent = <CustomersHighestPurchasesYearList />;
        break;
      }
      case 'most-faithful': {
        renderComponent = <MostFaithfulCustomersList />;
        break;
      }
      case 'wines-recommendations': {
        renderComponent = (
          <Select
            selectCustomers
            actionText="Buscar recomendações"
            handleActionFunction={handleSelectedCustomer}
          />
        );
        break;
      }
      default:
    }

    setCurrentList(renderComponent);
  }, []);

  return (
    <Container>
      <MainContent>
        <Header
          renderCurrentList={currentListType =>
            handleRenderCurrentList(currentListType)}
        />

        {currentList && currentList}
      </MainContent>
    </Container>
  );
};

export default Dashboard;
