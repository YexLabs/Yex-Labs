export const truncateAddress = (address) =>
  address.substr(0, 6) + "..." + address.substr(-4);
