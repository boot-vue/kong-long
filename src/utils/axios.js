import request from 'axios';
import {message, notification} from "ant-design-vue";

const axios = request.create({
    baseURL: process.env.VUE_APP_API,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 2000
})

// 异常处理
const errorHandler = (error) => {
    message.error('网络异常~')
    return Promise.reject(error)
}

// 响应拦截器
axios.interceptors.response.use((response) => {
    if (response.status !== 200) {
        notification.error(response.data)
        return
    }
    return response.data
}, errorHandler);

export default axios;
