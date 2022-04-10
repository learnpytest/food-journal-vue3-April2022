import axios from "axios"
const BASE_URL = 'http://localhost:8000'
import {
  LOCALSTORAGE_KEY
} from "../configs/config"

const axiosCreateInstance = axios.create({
  baseURL: BASE_URL
})

axiosCreateInstance.interceptors.request.use(config => {
  const token = localStorage.getItem(LOCALSTORAGE_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, err => Promise.reject(err))

export const helper = axiosCreateInstance