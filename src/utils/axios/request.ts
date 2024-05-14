// axios封装
import axios from 'axios'

const instance = axios.create({
    baseURL: '/api',
    timeout: 15000,
    // withCredentials: true,
})

instance.interceptors.request.use(
    // 配置请
    config => {
        localStorage.getItem("token")
        && (config.headers["Authorization"] = localStorage.getItem("token"))
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        return Promise.reject(error)
    }
)
export default instance