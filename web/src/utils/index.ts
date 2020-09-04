const priceFormatter = (value: number): string => {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const priceFormatted = formatter.format(value);

  return priceFormatted;
};

export { priceFormatter };
