import { API_URL, publicHeaders } from './api';

export const loginService = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: publicHeaders,
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error('Credenciales inválidas');
  const token = response.headers.get('Authorization');
  const user = await response.json();
  return { token, user };
};

export const registerService = async (email, name, password, image) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: publicHeaders,
    body: JSON.stringify({ email, name, password, image }),
  });
  if (!response.ok) throw new Error('Error al registrarse');
  const token = response.headers.get('Authorization');
  const user = await response.json();
  return { token, user };
};

export { API_URL };
