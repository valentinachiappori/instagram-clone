import Constants from 'expo-constants';

export const API_URL = `http://${Constants.expoConfig?.hostUri?.split(':')[0] ?? 'localhost'}:3000`;

export const authHeaders = (token) => ({
  'Content-Type': 'application/json',
  'Authorization': token?.startsWith('Bearer') ? token : `Bearer ${token}`,
});

export const publicHeaders = {
  'Content-Type': 'application/json',
};

export const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Error ${response.status}`);
  }
  return response.json();
};
