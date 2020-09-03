const cpfFormatter = (cpf: string): string => {
  const formattedCpf = cpf.replace(/[^\d]/g, '');

  return formattedCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

export { cpfFormatter };
