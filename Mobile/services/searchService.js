import { API_URL, publicHeaders, handleResponse } from './api';

export const search = (query) =>
  fetch(`${API_URL}/search?query=${encodeURIComponent(query)}`, {
    method: 'GET',
    headers: publicHeaders,
  }).then(handleResponse);
