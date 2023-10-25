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
export const getComments = async (id) => {
  return await api.get(`/api/comments/${id}`);
};
export const getOrderById = async (id) => {
  return await api.get(`/api/orders/${id}`);
};
export const createComments = async (data) => {
  return await api.post(`/api/comments`, data);
};

export const createOrderStatus = async (data) => {
  return await api.post(`/api/order_status`, data);
};
export const getOrderStatus = async () => {
  return await api.get(`/api/order_status`);
};
export const createProofStatus = async (data) => {
  return await api.post(`/api/proof_status`, data);
};
export const getProofStatus = async () => {
  return await api.get(`/api/proof_status`);
};

export const getUploadTypes = async () => {
  return await api.get(`/api/upload_type`);
};
export const createUploadTypes = async (data) => {
  return await api.post(`/api/upload_type`, data);
};