import { API_URL } from './authService';

export const getTimelineService = async (token: string) => {
  const formattedToken = token.startsWith('Bearer') ? token : `Bearer ${token}`;

  const response = await fetch(`${API_URL}/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': formattedToken,
    },
  });

  if (!response.ok) {
    throw new Error('Error al cargar el timeline');
  }

  return response.json();
};