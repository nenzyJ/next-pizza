import { User } from '@prisma/client';
import { axiosInstance } from './axios';


export const getMe = async () => {
  const { data } = await axiosInstance.get<User>('/auth/me');

  return data;
};