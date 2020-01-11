import axios from 'axios'

const api = axios.create({
    baseURL: '/api',
})

export const createContact = payload => api.post(`/contacts`, payload)

const apis = {
    createContact,
}

export default apis