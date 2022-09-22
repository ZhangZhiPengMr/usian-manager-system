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
/**
 * 获取用户信息接口
 * @returns 
 */
export const getUser = () => {
    return request({
        url: '/admin/getUserInfo',
        method: 'GET'
    })
}
/**
 * 退出登录接口
 * @returns 
 */
export const logout = () => {
    return request({
        url: "/admin/logout",
        method: "POST"
    })
}