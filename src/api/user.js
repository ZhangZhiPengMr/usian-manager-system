import request from "../utils/request"
/**
 * 登录接口
 * @param data {username:'', password:''}
 * @returns 
 */
export const login = (data = {}) => {
    return request({
        url: 'admin/login',
        method: "POST",
        data
    })
}

export const getUser = () => {
    return request({
        url: '/admin/getUserInfo',
        method:'GET'
    })
}