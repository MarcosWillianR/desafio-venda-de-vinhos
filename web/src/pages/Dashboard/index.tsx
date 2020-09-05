import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import AllCustomersList from '../../components/AllCustomersList';
import MostFaithfulCustomersList from '../../components/MostFaithfulCustomersList';

import Header from '../../components/Header';
import { Select } from '../../components/Form';

import { selectYearOptions } from '../../utils/constants';

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

  const handleSelectedYear = useCallback(
    (selectedYear: string) => {
      push(`/dashboard/customers/purchases/highest/${selectedYear}`);
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
        renderComponent = (
          <Select
            customOptions={selectYearOptions}
            selectTitle="Selecione o ano"
            informativeText="O ano escolhido será reduzido em 1, ex: 2017 vira 2016."
            actionText="Buscar maiores compras"
            handleActionFunction={handleSelectedYear}
          />
        );
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
            selectTitle="Selecione o cliente"
            actionText="Buscar recomendações"
            handleActionFunction={handleSelectedCustomer}
          />
        );
        break;
      }
      default:
    }

    setCurrentList(renderComponent);
  }, [handleSelectedYear, handleSelectedCustomer]);

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
