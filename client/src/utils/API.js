import axios from 'axios'

export default {
  getDbBooks: () => {
    return axios.get(`/books`)
  },
  saveDbBook: id => {
    // requires google book id
    return axios.post(`/books/${id}`)
  },
  deleteDbBook: _id => {
    // requires mongoose db _id
    return axios.delete(`/books/${_id}`)
  },
  googleBookById: id => {
    // requires google book id
    return  axios.get(`/detail/${id}`)
  },
  googleBooks: str => {
    return axios.get(`/search/${str}`)
  }
}