import request from "../utils/request"

const gitBanner = () => {
    return request({
        url: '/',
        proxy: process.env.VUE_APP_BASE_API
    })
}

/**
 * 获取会员列表接口
 * @param page
 * @param size
 * @param data
 */
const getMemberList = (page = 1, size = 10, data = {}) => {
    return request({
        url: `/member/list/search/${page}/${size}`,
        method: 'post',
        data
    })
}

export default {
    gitBanner,
    getMemberList
}