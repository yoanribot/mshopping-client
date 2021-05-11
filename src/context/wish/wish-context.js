import { createContext } from 'react';

export const Context = createContext({
  onCheckProduct: () => {},
});

export const Consumer = Context.Consumer;
export const Provider = Context.Provider;
