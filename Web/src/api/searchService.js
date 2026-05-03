import api from './axios'

export const search = (query) => {
    return api.get(`/search`, { params: { query } }).then(res => res.data)
}