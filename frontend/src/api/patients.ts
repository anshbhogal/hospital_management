import apiClient from './index';

export const getPatients = async () => {
  const response = await apiClient.get('/patients');
  return response.data;
};

export const createPatient = async (patientData) => {
  const response = await apiClient.post('/patients', patientData);
  return response.data;
};

export const getPatientById = async (patientId) => {
  const response = await apiClient.get(`/patients/${patientId}`);
  return response.data;
};

export const updatePatient = async (patientId, patientData) => {
  const response = await apiClient.put(`/patients/${patientId}`, patientData);
  return response.data;
};

export const deletePatient = async (patientId) => {
  const response = await apiClient.delete(`/patients/${patientId}`);
  return response.data;
};
