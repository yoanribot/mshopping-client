import { createContext } from 'react';

export const Context =  createContext({
    currentUser: {},
    getUserByAuth0Id: () => {},
    getUser: () => {},
    createUser: () => {},
    updateUser: () => {},
    removeUser: () => {},
});

export const Consumer = Context.Consumer;
export const Provider = Context.Provider;