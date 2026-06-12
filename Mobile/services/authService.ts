const API_URL = 'http://192.168.100.6:3000';

export const loginService = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }), 
  });

  if (!response.ok) {
    throw new Error('Credenciales inválidas');
  }
  const token = response.headers.get('Authorization');
  const user = await response.json(); 

  return { token, user };
};

export const registerService = async (email: string, fullName: string, username: string, password: string) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, fullName, username, password }),
  });

  if (!response.ok) {
    throw new Error('Error al registrarse');
  }
  const token = response.headers.get('Authorization');
  const user = await response.json(); 

  return { token, user };
};

export { API_URL };