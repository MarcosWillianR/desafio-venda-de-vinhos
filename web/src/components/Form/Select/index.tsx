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
  informativeText?: string;
  actionText: string;
  selectTitle: string;
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
  informativeText,
  selectTitle,
  handleActionFunction,
}) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [options, setOptions] = useState<SelectOption[]>([]);

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
      setOptions([]);

      console.log(selectCustomers);

      api.get<CustomerResponse[]>('customers').then(({ data: customers }) => {
          setOptions(state => {
            if (state.length <= 0) {
              return customers.map(({ nome, cpf }) => ({ label: nome, value: cpf }));
            } else {
              return state;
            }
          });
        })
      };

    if (customOptions && customOptions.length > 0) {
      setOptions(customOptions);
    }
  }, [selectCustomers, customOptions]);

  return (
    <Container>
      <div>
        <h1>{selectTitle}</h1>

        {informativeText && <small>{informativeText}</small>}

        {options.length > 0 ? (
          <SelectWrapper>
            <select onChange={handleSelectCustomer}>
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
