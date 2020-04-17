import api from '../Services/api';

export const verifyEmailInStrapi = async (email) => {
  try {
    const response = await api.users.find({email});
    return response.length > 0;
  } catch (error) {
    return false;
  }
};