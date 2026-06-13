import { API_URL, authHeaders, handleResponse } from './api';

export const getPost = (postId, token) =>
  fetch(`${API_URL}/posts/${postId}`, { method: 'GET', headers: authHeaders(token) })
    .then(handleResponse);

export const createPost = (image, description, token) =>
  fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ image, description }),
  }).then(handleResponse);

export const editPost = (postId, description, image, token) =>
  fetch(`${API_URL}/posts/${postId}`, {
    method: 'PUT',
    headers: authHeaders(token),
    body: JSON.stringify({ description, image }),
  }).then(handleResponse);

export const deletePost = (postId, token) =>
  fetch(`${API_URL}/posts/${postId}`, { method: 'DELETE', headers: authHeaders(token) })
    .then(handleResponse);

export const updateLike = (postId, token) =>
  fetch(`${API_URL}/posts/${postId}/like`, { method: 'PUT', headers: authHeaders(token) })
    .then(handleResponse);

export const addComment = (postId, text, token) =>
  fetch(`${API_URL}/posts/${postId}/comment`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ body: text }),
  }).then(handleResponse);
