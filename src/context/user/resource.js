
import axios from 'axios';

export const getUserById = userId => axios.get(`/users/${userId}`)
    .then(respose => respose.data);

export const getUserByAuth0Id = auth0Id => axios.get(`/users/auth0/${auth0Id}`)
    .then(respose => respose.data);

export const createUser = user => axios.post(`/users/`, { user })
    .then(respose => respose.data);

export const addWish = (userId, wish) => axios.post(`/users/${userId}/wishes`, wish)
    .then(respose => respose.data);

export const removeWish = (userId, wishkId) => axios.delete(`/users/${userId}/wishes/${wishkId}`)
    .then(respose => respose.data);
