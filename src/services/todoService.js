import http from '../http-common';

const getAll = () => {
  return http.get('/todos');
};

const getTodoByID = (id) => {
  return http.get(`/todos/${id}`);
};

const add = (data) => {
  return http.post('/todos/add/', data);
};

const update = (id, data) => {
  return http.put(`/todos/update/${id}`, data);
};

const toggleTodos = () => {
  return http.put('/todos');
};

const remove = (id) => {
  return http.delete(`/todos/delete/${id}`);
};

const clearCompleted = () => {
  return http.delete(`/todos/`);
};

export default {
  getAll,
  getTodoByID,
  add,
  update,
  remove,
  clearCompleted,
  toggleTodos,
};
