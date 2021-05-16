import axios from 'axios';

export const onCheckProduct = (wishId) =>
  axios.get(`/wishes/${wishId}/check`).then((respose) => respose.data);

export const getAfiliateLink = (wishId) =>
  axios.get(`/wishes/${wishId}/store`).then((respose) => respose.data);
