import api from './axios'

export const getUser = (userId) => {
    return api.get(`/user/${userId}`).then(res => res.data)
}

export const followUser = (userId) => {
    return api.put(`/users/${userId}/follow`).then(res => res.data)
}