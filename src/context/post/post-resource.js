
import axios from 'axios';

export const getPosts = () => axios.get(`/posts`)
    .then(respose => respose.data);

export const getPost = postId => axios.get(`/posts/${postId}`)
    .then(respose => respose.data);

export const createPost = post => axios.post(`/posts`, { post })
    .then(respose => respose.data);
