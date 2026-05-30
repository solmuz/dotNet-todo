import axios from "axios";

const BASE = "http://localhost:5268/api/todo";

export const getTodos = () => axios.get(BASE).then(r => r.data);
export const createTodo = (title: string) => axios.post(BASE, { title });
export const toggleTodo = (id: number, isComplete: boolean) =>
  axios.put(`${BASE}/${id}`, { isComplete });
export const deleteTodo = (id: number) => axios.delete(`${BASE}/${id}`)
