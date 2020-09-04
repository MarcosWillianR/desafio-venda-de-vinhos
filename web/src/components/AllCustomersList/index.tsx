import React, { useEffect, useState } from 'react';

import api from '../../services/apiClient';

import { priceFormatter } from '../../utils';

import {
  CustomersList,
  CustomersListItem,
  LoadingContainer,
  Loading,
} from './styles';

interface CustomersListState {
  id: number;
  nome: string;
  cpf: string;
  valorTotal: number;
}

const AllCustomersList: React.FC = () => {
  const [list, setList] = useState<CustomersListState[]>([]);

  useEffect(() => {
    api.get('customers').then(({ data: listData }) => setList(listData));
  }, []);

  return (
    <>
      <CustomersList>
        <strong>Nome</strong>
        <strong>cpf</strong>
        <strong>Valor total em compras</strong>

        {list.length > 0 &&
          list.map(customer => (
            <CustomersListItem key={customer.cpf}>
              <span>{customer.nome}</span>
              <span>{customer.cpf}</span>
              <span>{priceFormatter(customer.valorTotal)}</span>
            </CustomersListItem>
          ))}
      </CustomersList>

      {list.length <= 0 && (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      )}
    </>
  );
};

export default AllCustomersList;
