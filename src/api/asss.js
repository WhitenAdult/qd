import request from '@/utils/request'

//新增社团
export function addAsss(data) {
  return request({
    url: '/asss/api/addAsss',
    method: 'post',
    data: data 
  })
}

//获取社团列表
export function getAsssList(data) {
  return request({
    url: '/asss/api/getAsssList',
    method: 'get',
    params: data
  })
}

//获取活动详情
export function getAssInfo(data) {
  return request({
    url: '/asss/api/getAssInfo',
    method: 'get',
    params: data
  })
}

//删除活动
export function deleteAsss(data) {
  return request({
    url: '/asss/api/delete',
    method: 'get',
    params: data
  })
}