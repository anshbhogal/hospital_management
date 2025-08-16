import apiClient from './index';

export const getBills = async (params) => {
  const response = await apiClient.get('/billing', { params });
  return response.data;
};

export const createBill = async (billData) => {
  const response = await apiClient.post('/billing', billData);
  return response.data;
};

export const getBillById = async (billId) => {
  const response = await apiClient.get(`/billing/${billId}`);
  return response.data;
};

export const updateBill = async (billId, billData) => {
  const response = await apiClient.put(`/billing/${billId}`, billData);
  return response.data;
};

export const deleteBill = async (billId) => {
  const response = await apiClient.delete(`/billing/${billId}`);
  return response.data;
};
