import request from '@/utils/request'

export function login(userName, password) {
  return request({
    url: '/users/api/login',
    method: 'post',
    data: {
      userName,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/users/api/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/users/api/logout',
    method: 'get'
  })
}
