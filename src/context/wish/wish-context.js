import { createContext } from 'react';

export const Context = createContext({
  wishes: [],
  currentWish: { lastPrices: [] },
  isLoading: false,
  getWishes: () => {},
  getWish: () => {},
  removeWish: () => {},
  onCheckProduct: () => {},
  getAfiliateLink: () => {},
});

export const Consumer = Context.Consumer;
export const Provider = Context.Provider;
