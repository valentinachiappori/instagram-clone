import api from './axios'

export const getUser = (userId) => {
    return api.get(`/user/${userId}`).then(res => res.data)
}