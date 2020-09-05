import React, { useEffect, useState, useCallback } from 'react';
import { FiChevronDown } from 'react-icons/fi';

import api from '../../../services/apiClient';

import {
  Container,
  SelectWrapper,
  LoadingContainer,
  Loading,
  SelectButton,
} from './styles';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  customOptions?: SelectOption[];
  selectCustomers?: boolean;
  actionText: string;
  handleActionFunction(optionValue: string): void;
}

interface CustomerResponse {
  nome: string;
  cpf: string;
}

const Select: React.FC<SelectProps> = ({
  customOptions,
  selectCustomers,
  actionText,
  handleActionFunction,
}) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [options, setOptions] = useState<SelectOption[]>(customOptions || []);

  const handleSelectCustomer = useCallback(
    ({ target }) => {
      if (target.value !== selectedOption) {
        setSelectedOption(target.value);
      }
    },
    [selectedOption],
  );

  useEffect(() => {
    if (selectCustomers) {
      api.get<CustomerResponse[]>('customers').then(({ data: customers }) => {
        setOptions(
          customers.map(({ nome, cpf }) => ({ label: nome, value: cpf })),
        );
      });
    }
  }, [selectCustomers]);

  return (
    <Container>
      <div>
        <h1>Selecione o cliente</h1>

        {options.length > 0 ? (
          <SelectWrapper>
            <select onChange={handleSelectCustomer}>
              {customOptions &&
                customOptions.map(({ label, value }) => (
                  <option value={value}>{label}</option>
                ))}

              {options.length > 0 &&
                options.map(({ label, value }) => (
                  <option value={value}>{label}</option>
                ))}
            </select>
            <FiChevronDown />
          </SelectWrapper>
        ) : (
          <LoadingContainer>
            <Loading />
          </LoadingContainer>
        )}

        <SelectButton
          type="button"
          onClick={() =>
            handleActionFunction(selectedOption || options[0].value)}
          disabled={options.length <= 0}
        >
          {actionText}
        </SelectButton>
      </div>
    </Container>
  );
};

export default Select;
