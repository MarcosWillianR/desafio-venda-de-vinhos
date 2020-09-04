import React, { useEffect, useState } from 'react';

import api from '../../services/apiClient';

import { priceFormatter } from '../../utils';

import {
  CustomersList,
  CustomersListItem,
  LoadingContainer,
  Loading,
} from './styles';

interface CustomersHighestPurchasesYearState {
  customer: {
    cpf: string;
    nome: string;
  };
  purchase: {
    data: string;
    item: {
      produto: string;
      preco: number;
    };
  };
}

const CustomersHighestPurchasesYear: React.FC = () => {
  const [list, setList] = useState<CustomersHighestPurchasesYearState[]>([]);

  useEffect(() => {
    api
      .get('customers/highest-purchase-year', {
        params: {
          actualYear: 2017,
        },
      })
      .then(({ data: listData }) => setList(listData));
  }, []);

  return (
    <>
      <CustomersList>
        <strong>Nome</strong>
        <strong>cpf</strong>
        <strong>data da compra</strong>
        <strong>produto</strong>
        <strong>preço</strong>

        {list.length > 0 &&
          list.map(({ customer, purchase }) => (
            <CustomersListItem key={customer.cpf}>
              <span>{customer.nome}</span>
              <span>{customer.cpf}</span>
              <span>{purchase.data}</span>
              <span>{purchase.item.produto}</span>
              <span>{priceFormatter(purchase.item.preco)}</span>
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

export default CustomersHighestPurchasesYear;
