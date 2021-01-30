
import axios from 'axios';

export const getUserByAuth0Id = auth0Id => axios.get(`/users/auth0/${auth0Id}`)
    .then(respose => respose.data);

export const createUser = user => axios.post(`/users/`, { user })
    .then(respose => respose.data);
