import axios from "axios"

export const api = axios.create({
  baseURL: "http://192.168.1.65:4001"
})

// REQUEST LOG
api.interceptors.request.use((req) => {
  console.log(" REQUEST:", req.method?.toUpperCase(), req.url, req.data)
  return req
})

// RESPONSE LOG
api.interceptors.response.use(
  (res) => {
    console.log(" RESPONSE:", res.data)
    return res
  },
  (error) => {
    console.log(" ERROR:", error.response?.data || error.message)
    return Promise.reject(error)
  }
)