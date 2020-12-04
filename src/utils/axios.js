import request from 'axios';
import {message} from "ant-design-vue";

const axios = request.create({
    baseURL: process.env.VUE_APP_API,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 6000
})

// 异常处理
const errorHandler = (error) => {
    message.error('网络异常~')
    return Promise.reject(error)
}

// 响应拦截器
axios.interceptors.response.use((response) => {
    console.log(response);
    return response
}, errorHandler);

export default axios;
