import { Ingredient } from '@prisma/client';
import { axiosInstance } from './axios';
import { ApiRoutes } from './constats';

export const getAll = async (): Promise<Ingredient[]> => {
  return (await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS)).data;
};