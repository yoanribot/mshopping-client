import { createContext } from 'react';

export const Context = createContext({
  currentWish: { lastPrices: [] },
  isLoading: false,
  getWish: () => {},
  removeWish: () => {},
  onCheckProduct: () => {},
  getAfiliateLink: () => {},
});

export const Consumer = Context.Consumer;
export const Provider = Context.Provider;
