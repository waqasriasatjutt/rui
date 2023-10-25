import api from "./api";

export const login = async (user) => {
  return await api.post(`/api/login`, user);
};
export const addUsers = async (user) => {
  return await api.post(`/api/adduser`, user);
};
export const createOrders = async (data) => {
  return await api.post(`/api/orders`, data);
};
export const getOrders = async (data) => {
  return await api.get(`/api/orders`, data);
};
