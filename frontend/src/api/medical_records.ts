import apiClient from './index';

export const getMedicalRecordsByPatient = async (patientId) => {
  const response = await apiClient.get(`/medical-records/${patientId}`);
  return response.data;
};

export const getAllMedicalRecords = async () => {
  const response = await apiClient.get('/medical-records');
  return response.data;
};

export const addMedicalRecord = async (recordData) => {
  const response = await apiClient.post('/medical-records', recordData);
  return response.data;
};

export const getMedicalRecordById = async (recordId) => {
  const response = await apiClient.get(`/medical-records/record/${recordId}`);
  return response.data;
};

export const updateMedicalRecord = async (recordId, recordData) => {
  const response = await apiClient.put(`/medical-records/record/${recordId}`, recordData);
  return response.data;
};

export const deleteMedicalRecord = async (recordId) => {
  const response = await apiClient.delete(`/medical-records/record/${recordId}`);
  return response.data;
};
