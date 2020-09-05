import React, { useEffect, useState } from 'react';
import { FiLogOut, FiChevronLeft } from 'react-icons/fi';
import { useHistory, Link, useParams } from 'react-router-dom';
import { uuid } from 'uuidv4';

import api from '../../../services/apiClient';

import { priceFormatter } from '../../../utils';

import {
  Container,
  MainContent,
  YearLoading,
  CustomersList,
  CustomersListItem,
  LoadingContainer,
  Loading,
} from './styles';

interface CustomersHighestPurchasesYearListState {
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

interface ParamsProps {
  year?: string;
}

const CustomersHighestPurchasesYear: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>();
  const { goBack } = useHistory();
  const params: ParamsProps = useParams();

  const [list, setList] = useState<CustomersHighestPurchasesYearListState[]>(
    [],
  );

  useEffect(() => {
    if (params.year) {
      setSelectedYear(Number(params.year) - 1);

      api
        .get('customers/highest-purchase-year', {
          params: {
            actualYear: params.year,
          },
        })
        .then(({ data: listData }) => {
          setList(listData);
        });
    }
  }, [params.year]);

  return (
    <Container>
      <MainContent>
        <header>
          <button type="button" onClick={() => goBack()}>
            <FiChevronLeft />
          </button>

          {selectedYear ? <strong>{selectedYear}</strong> : <YearLoading />}

          <Link to="/">
            <FiLogOut />
          </Link>
        </header>

        <CustomersList>
        <strong>Nome</strong>
        <strong>cpf</strong>
        <strong>data da compra</strong>
        <strong>produto</strong>
        <strong>preço</strong>

        {list.length > 0 &&
          list.map(({ customer, purchase }) => (
            <CustomersListItem key={uuid()}>
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
      </MainContent>
    </Container>
  );
};

export default CustomersHighestPurchasesYear;
