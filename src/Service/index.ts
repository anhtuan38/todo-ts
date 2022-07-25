import { API } from '../constants';
import axios from 'axios';

export const getTodoServer = (params: any) => axios.get(`${API}/todos`, params);

export const createTodoServer = () => axios.post(`${API}/todos`);

export const editTodoServer = (id: string) => axios.patch(`${API}/todos/${id}`);

export const deleteTodoServer = (id: string) =>
  axios.delete(`${API}/todos/${id}`);
