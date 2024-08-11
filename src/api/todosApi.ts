import axios from 'axios';
import { API_URL, TODOS_URL } from '@/constants/api';
import type { IFormTodo, ITodo } from '@/types/todo.interface';

export const getTodos = async (): Promise<ITodo[]> => {
  const { data } = await axios.get<ITodo[]>(`${API_URL}/${TODOS_URL}`);
  return data;
};

export const store = async (data: IFormTodo) => {
  return await axios.post(`${API_URL}/${TODOS_URL}`, data);
};
