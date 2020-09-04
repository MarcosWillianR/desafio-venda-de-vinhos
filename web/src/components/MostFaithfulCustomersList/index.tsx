import React, { useEffect, useState } from 'react';

import api from '../../services/apiClient';

import {
  CustomersList,
  CustomersListItem,
  LoadingContainer,
  Loading,
} from './styles';

interface MostFaithfulCustmersListState {
  nome: string;
  cpf: string;
  purchasesHistory: string[];
}

const MostFaithfulCustmersList: React.FC = () => {
  const [list, setList] = useState<MostFaithfulCustmersListState[]>([]);

  useEffect(() => {
    api
      .get('customers/most-faithful')
      .then(({ data: listData }) => setList(listData));
  }, []);

  return (
    <>
      <CustomersList>
        <strong>nome</strong>
        <strong>cpf</strong>
        <strong>comprou com você nas datas</strong>

        {list.length > 0 &&
          list.map(customer => (
            <CustomersListItem key={customer.cpf}>
              <span>{customer.nome}</span>
              <span>{customer.cpf}</span>
              <div>
                {customer.purchasesHistory.map(data => (
                  <span>{data}</span>
                ))}
              </div>
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

export default MostFaithfulCustmersList;
