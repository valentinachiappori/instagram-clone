import api from './api'

export const getUser = (userId) => {
    return api.get(`/user/${userId}`).then(res => res.data)
}