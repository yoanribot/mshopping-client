import axios from 'axios';

export const getWishes = (wishId) =>
  axios.get(`/wishes`).then((respose) => respose.data);

export const getWish = (wishId) =>
  axios.get(`/wishes/${wishId}`).then((respose) => respose.data);

export const removeWish = (wishId) =>
  axios.delete(`/wishes/${wishId}`).then((respose) => respose.data);

export const onCheckProduct = (wishId) =>
  axios.get(`/wishes/${wishId}/check`).then((respose) => respose.data);

export const getAfiliateLink = (wishId) =>
  axios.get(`/wishes/${wishId}/store`).then((respose) => respose.data);
