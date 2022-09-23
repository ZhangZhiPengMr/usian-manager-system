/**
 * 会员列表的接口
 */

//引入request
import request from "../utils/request";

/**
 * 请求会员管理列表查询接口
 * @param currentPage
 * @param pageSize
 * @param data
 * @returns {AxiosPromise}
 */

const memberList = (currentPage, pageSize, data) => {
  return request({
    url: `/member/list/search/${currentPage}/${pageSize}`,
    method: "POST",
    data
  });
};
/**
 * 添加会员列表接口
 * @param data
 * @returns {AxiosPromise}
 */
const addMember = (data) => {
  return request({
    url: "/member",
    method: "POST",
    data
  });
};

// 编辑会员接口
const editMember = (id, data) => {
  return request({
    url: `/member/${id}`,
    method: "PUT",
    data
  });
};


// 查询单个会员接口
const findMember = (id) => {
  return request({
    url: `/member/${id}`,
    method: "GET"
  })
}

//删除单个会员管理接口、
const delMemder = (id) => {
  return request({
    url: `/member/${id}`,
    method: "DELETE"
  })
}
export default {
  memberList,
  addMember,
  editMember,
  findMember,
  delMemder
};