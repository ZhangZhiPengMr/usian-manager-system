//引入axios
import axios from 'axios'
import { _ } from 'core-js'
import { Message } from 'element-ui'
import store from '../store/index'

const excepotionMessage = {
    1000: '用户名或密码发送错误',
    // 2000: 'xxx发生错误'
}

// 挂载axios实例配置返回实例对象
const serveice = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000,
})

serveice.interceptors.request.use(function (config) {
    const token = store.getters.token
    if (token) config.headers.authorization = "Bearer " + token
    // 在发送请求之前做些什么
    return config
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
})
serveice.interceptors.response.use(
    function (response) {
        if (response.status < 400) {

            return response.data.data
        }
        if (response.status === 401) {
            // TODO token的过期处理
            return
        }
        //调用提示错误信息
        _showError(response.data.code, response.data.message)

        return response
    },
    function (error) {
        // 对响应错误做点什么
        return Promise.reject(error)
    }
)
// 提示错误信息
const _showError = (errorCode, errorMessage) => {
    // Message.error('1') // 正确 success, 错误 error
    let title
    title = excepotionMessage[errorCode] || errorMessage || '发生未知错误'
    Message.error(title)
}

//解决不同请求方式统一使用data来进行传参
const request = (options) => {
    options.method = options.method || 'get'
    if (options.method.toLowerCase() === 'get') {
        options.params = options.data || options.params
        delete options.data
    }

    //解决多个代理请求问题
    serveice.defaults.baseURL = options.proxy || process.env.VUE_APP_BASE_API
    return serveice(options)
}


//导出实例
export default request