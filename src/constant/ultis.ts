export const formatMoney = (money: number) => {
  if (money !== 0 && !money) {
    return '0';
  }
  return `${money}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};
