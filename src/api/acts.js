import request from '@/utils/request'

//新增活动
export function addActs(data) {
  return request({
    url: '/acts/api/addActs',
    method: 'post',
    data: data 
  })
}

//获取所有活动信息列表
export function getActsList(data) {
  return request({
    url: '/acts/api/getActsList',
    method: 'get',
    params: data
  })
}

//获取活动详情
export function getActInfo(data) {
  return request({
    url: '/acts/api/getActInfo',
    method: 'get',
    params: data
  })
}

//删除活动
export function deleteActs(data) {
  return request({
    url: '/acts/api/delete',
    method: 'get',
    params: data
  })
}