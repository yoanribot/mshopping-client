
import axios from 'axios';

export const getPosts = () => axios.get(`/posts`)
    .then(respose => respose.data);

export const getPost = postId => axios.get(`/posts/${postId}`)
    .then(respose => respose.data);

export const createPost = post => axios.post(`/posts`, { post })
    .then(respose => respose.data);

export const upVote = postId => axios.put(`/posts/${postId}/votes/inc`)
    .then(respose => respose.data);

export const decVote = postId => axios.put(`/posts/${postId}/votes/dec`)
    .then(respose => respose.data);

export const addReview = (postId, userId, text) => axios.post(`/posts/${postId}/reviews`, {
        postId,
        userId,
        text,
    }).then(respose => respose.data);
