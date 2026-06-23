import Constants from 'expo-constants';

export const API_URL = `http://${Constants.expoConfig?.hostUri?.split(':')[0] ?? 'localhost'}:3000`;

export const authHeaders = (token) => ({
  'Content-Type': 'application/json',
  'Authorization': token?.startsWith('Bearer') ? token : `Bearer ${token}`,
});

export const publicHeaders = {
  'Content-Type': 'application/json',
};

let unauthorizedHandler = null;
export const setUnauthorizedHandler = (handler) => { unauthorizedHandler = handler; };

export const handleResponse = async (response) => {
  if (response.status === 401) {
    if (unauthorizedHandler) unauthorizedHandler();
    throw new Error('Sesión expirada. Iniciá sesión nuevamente.');
  }
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Error ${response.status}`);
  }
  if (response.status === 204) return null;
  return response.json();
};
