import { createContext } from 'react';

export const Context = createContext({
  onCheckProduct: () => {},
  getAfiliateLink: () => {},
});

export const Consumer = Context.Consumer;
export const Provider = Context.Provider;
