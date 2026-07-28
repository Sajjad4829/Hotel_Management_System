export const calculatePricing = (subtotal) => {
  const taxes = Math.round(subtotal * 0.12);
  const serviceFee = Math.round(subtotal * 0.05);
  const total = subtotal + taxes + serviceFee;

  return {
    subtotal,
    taxes,
    serviceFee,
    total,
  };
};