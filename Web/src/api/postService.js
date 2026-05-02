import api from './axios'

export const getPost = (postId) => {
    return api.get(`/posts/${postId}`).then(res => res.data)
}

export const addComment = (postId, text) => {
    return api.post(`/posts/${postId}/comment`, { body: text }).then(res => res.data)
}