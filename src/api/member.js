/**
 * 会员列表的接口
 */

//引入request
import request from "../utils/request"

const memberList = (currentPage, pageSize, data) => {
    return request({
        url: `/member/list/search/${currentPage}/${pageSize}`,
        method: "POST",
        data
    })
}



export default {
    memberList
}