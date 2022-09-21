/**
 * 
 */

const TOKEN_KEY = 'token'
const USER_INFO_KEY = "user"

/**
 * 设置token
 * @param {*} token 
 */
export const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token)
}
/**
 * 获取token
 * @param {*} token 
 */
export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY)
}
/**
 * 获取userInfo
 * @param {*} setUserInfo 
 */
export const setUserInfo = (userInfo) => {
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo))
}
/**
 * 获取userInfo
 * @param {*} setUserInfo 
 */
export const getUserInfo = () => {
    return JSON.parse(localStorage.getItem(USER_INFO_KEY) || '{}')
}
/**
 * 删除token和userinfo
 * @param {*} setUserInfo 
 */
export const removeTokenAddUserInfo = () => {
    localStorage.removeItem(USER_INFO_KEY)
    localStorage.removeItem(TOKEN_KEY)
}