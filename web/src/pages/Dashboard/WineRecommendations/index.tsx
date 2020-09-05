import React, { useEffect, useState } from 'react';
import { FiLogOut, FiChevronLeft } from 'react-icons/fi';
import { useHistory, Link, useParams } from 'react-router-dom';

import api from '../../../services/apiClient';

import {
  Container,
  MainContent,
  NameLoading,
  CustomersList,
  CustomersListItem,
  LoadingContainer,
  Loading,
} from './styles';

interface WineRecommendationsState {
  produto: string;
  variedade: string;
  categoria: string;
  vezesComprado: number;
  vezesCompradoCategoria: number;
  formattedTimesBought: string;
  formattedCategoryTimesBought: string;
}

interface WineRecommendationsResponse {
  produto: string;
  variedade: string;
  categoria: string;
  vezesComprado: number;
  vezesCompradoCategoria: number;
}

interface ParamsProps {
  customerCpf?: string;
}

const WineRecommendations: React.FC = () => {
  const [list, setList] = useState<WineRecommendationsState[]>([]);
  const [customerName, setCustomerName] = useState('');
  const { goBack } = useHistory();
  const params: ParamsProps = useParams();

  useEffect(() => {
    if (params.customerCpf) {
      api
        .get('customers/wines/recommendations', {
          params: {
            customerCpf: params.customerCpf,
          },
        })
        .then(({ data: responseData }) => {
          const formattedRecommendations = responseData.recommendations.map(
            (recommendation: WineRecommendationsResponse) => {
              const { vezesComprado, vezesCompradoCategoria } = recommendation;
              const formattedTimesBought =
                vezesComprado === 1
                  ? `${vezesComprado} vez`
                  : `${vezesComprado} vezes`;

              const formattedCategoryTimesBought =
                vezesCompradoCategoria === 1
                  ? `${vezesCompradoCategoria} vez`
                  : `${vezesCompradoCategoria} vezes`;

              return {
                ...recommendation,
                formattedTimesBought,
                formattedCategoryTimesBought,
              };
            },
          );
          setList(formattedRecommendations);
          setCustomerName(responseData.customer.nome);
        });
    }
  }, [params]);

  return (
    <Container>
      <MainContent>
        <header>
          <button type="button" onClick={() => goBack()}>
            <FiChevronLeft />
          </button>

          {customerName ? <strong>{customerName}</strong> : <NameLoading />}

          <Link to="/">
            <FiLogOut />
          </Link>
        </header>

        <CustomersList>
          <strong>produto</strong>
          <strong>variedade</strong>
          <strong>categoria</strong>
          <strong>comprou o mesmo produto</strong>
          <strong>comprou a mesma categoria</strong>

          {list.length > 0 &&
            list.map(recommendation => (
              <CustomersListItem key={recommendation.produto}>
                <span>{recommendation.produto}</span>
                <span>{recommendation.variedade}</span>
                <span>{recommendation.categoria}</span>
                <span>{recommendation.formattedTimesBought}</span>
                <span>{recommendation.formattedCategoryTimesBought}</span>
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

export default WineRecommendations;
