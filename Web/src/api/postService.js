import api from './axios'

export const getPost = (postId) => {
    return api.get(`/posts/${postId}`).then(res => res.data)
}

export const addComment = (postId, text) => {
    return api.post(`/posts/${postId}/comment`, { body: text }).then(res => res.data)
}

export const updateLike = (postId) => {
    return api.put(`/posts/${postId}/like`).then(res => res.data)
}

export const createPost = (image, description) => {
    return api.post('/posts', { image, description }).then(res => res.data)
}