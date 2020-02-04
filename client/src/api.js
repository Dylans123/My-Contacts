import axios from 'axios'

const api = axios.create({
    baseURL: '/api',
})

export const createContact = payload => api.post(`/contacts`, payload);
export const getContact = payload => api.get(`/contacts`, payload);

const apis = {
    createContact,
    getContact
}

export default apis