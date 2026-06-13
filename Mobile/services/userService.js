import { API_URL, authHeaders, handleResponse } from './api';

export const getTimelineService = (token) =>
  fetch(`${API_URL}/user`, { method: 'GET', headers: authHeaders(token) })
    .then(handleResponse);

export const getUser = (userId, token) =>
  fetch(`${API_URL}/user/${userId}`, { method: 'GET', headers: authHeaders(token) })
    .then(handleResponse);

export const followUser = (userId, token) =>
  fetch(`${API_URL}/users/${userId}/follow`, { method: 'PUT', headers: authHeaders(token) })
    .then(handleResponse);
