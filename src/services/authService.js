import http from '../http-common';

const register = (data) => {
  return http.post('users/register', data);
};

const login = (data) => {
    return http.post('users/login', data);
  };

const logout = () => {
  return http.get('/users/logout', logout);
};

const isAuthenticated = () => {
  return http.get('/users/authenticated');
};

export default {
  register,
  login,
  logout,
  isAuthenticated
};
