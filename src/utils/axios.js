import request from 'axios';
import {message} from "ant-design-vue";

const axios = request.create({
    baseURL: process.env.VUE_APP_API,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 2000
})

// 异常处理
const errorHandler = (error) => {
    if (error.response && error.response.data && error.response.data.message) {
        message.error(error.response.data.message, 10)
    } else {
        message.error(error.toString(), 10)
    }
    return Promise.reject(error)
}

// 响应拦截器
axios.interceptors.response.use((response) => {
    return response.data
}, errorHandler);

export default axios;
