import axios from 'axios'

const api = axios.create({
    baseURL: '/api',
})

export const getContact = (userID, payload) => api.get(`/showAll/${userID}`, payload);
export const addContact = (userID, payload) => api.post(`/add/${userID}`, payload); 
export const deleteContact = (userID, contactID, payload) => api.get(`/delete/${userID}/${contactID}`, payload);
export const searchContact = (userID, query, payload) => api.get(`/search/${userID}/${query}`, payload); 
export const updateContact = (userID, contactID, payload) => api.post(`/update/${userID}/${contactID}`, payload);

const apis = {
    getContact,
    addContact,
    deleteContact,
    searchContact,
    updateContact
}

export default apis