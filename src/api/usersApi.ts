import axios from 'axios';
import { API_URL, USERS_URL } from '@/constants/api';
import type { IUser } from '@/types/user.interface';

export const fetchUsers = async () => {
  const { data } = await axios.get<IUser[]>(`${API_URL}/${USERS_URL}`);
  return data;
};
