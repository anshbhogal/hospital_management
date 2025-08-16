import apiClient from './index';

export const getDoctors = async () => {
  const response = await apiClient.get('/doctors');
  return response.data;
};

export const createDoctor = async (doctorData) => {
  const response = await apiClient.post('/doctors', doctorData);
  return response.data;
};

export const getDoctorById = async (doctorId) => {
  const response = await apiClient.get(`/doctors/${doctorId}`);
  return response.data;
};

export const updateDoctor = async (doctorId, doctorData) => {
  const response = await apiClient.put(`/doctors/${doctorId}`, doctorData);
  return response.data;
};

export const deleteDoctor = async (doctorId) => {
  const response = await apiClient.delete(`/doctors/${doctorId}`);
  return response.data;
};
