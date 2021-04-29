
import axios from 'axios';

export const sendEmail = (emailData) => axios.post(`/send-email`, emailData)
  .then(respose => respose.data);
