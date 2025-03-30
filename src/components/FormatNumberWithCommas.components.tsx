export const FormatNumberWithCommas = (value: number) => {
  const getValue = value.toString();
  return getValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};