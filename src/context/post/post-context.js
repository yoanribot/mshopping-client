import { createContext } from 'react';

export const Context =  createContext({
    currentPost: {},
    getPosts: () => {},
    getPost: () => {},
    createPost: () => {},
    updatePost: () => {},
    removePost: () => {},
    upVote: () => {},
    decVote: () => {},
    addReview: () => {},
    removeReview: () => {},
});

export const Consumer = Context.Consumer;
export const Provider = Context.Provider;