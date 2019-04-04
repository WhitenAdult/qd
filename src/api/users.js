import request from '@/utils/request'

//新增用户
export function addUsers(data) {
  return request({
    url: '/users/api/addUsers',
    method: 'post',
    data: data 
  })
}

//修改个人信息
export function modifyInfo(data) {
  return request({
    url: '/users/api/modifyInfo',
    method: 'post',
    data: data 
  })
}

//个人资料获取
export function getPersonalInfo(data) {
  return request({
    url: '/users/api/getPersonalInfo',
    method: 'get',
    params: data 
  })
}

//获取所有用户信息列表
export function getUserInfo(data) {
  return request({
    url: '/users/api/getUserInfo',
    method: 'get',
    params: data
  })
}

//重置密码
export function resetPassword(data) {
  return request({
    url: '/users/api/reset',
    method: 'post',
    data: data
  })
}

//删除用户
export function deleteU(data) {
  return request({
    url: '/users/api/delete',
    method: 'post',
    data: data
  })
}

//用户注册
export function register(data) {
  return request({
    url: '/users/api/register',
    method: 'post',
    data: data 
  })
}
