import request from "../utils/request"
/**
 * 
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