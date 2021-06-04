import { createContext } from 'react';

export const Context = createContext({
  currentUser: {},
  isLoading: false,
  getUserByAuth0Id: () => {},
  getUserById: () => {},
  createUser: () => {},
  updateUser: () => {},
  removeUser: () => {},
  addWish: () => {},
  updateWish: () => {},
  removeWish: () => {},
});

export const Consumer = Context.Consumer;
export const Provider = Context.Provider;
