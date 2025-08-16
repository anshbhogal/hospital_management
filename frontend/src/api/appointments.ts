import apiClient from './index';

export const getAppointments = async (params) => {
  const response = await apiClient.get('/appointments', { params });
  return response.data;
};

export const createAppointment = async (appointmentData) => {
  const response = await apiClient.post('/appointments', appointmentData);
  return response.data;
};

export const getAppointmentById = async (appointmentId) => {
  const response = await apiClient.get(`/appointments/${appointmentId}`);
  return response.data;
};

export const updateAppointment = async (appointmentId, appointmentData) => {
  const response = await apiClient.put(`/appointments/${appointmentId}`, appointmentData);
  return response.data;
};

export const deleteAppointment = async (appointmentId) => {
  const response = await apiClient.delete(`/appointments/${appointmentId}`);
  return response.data;
};
