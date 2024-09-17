import request from '@/plugins/axios'

//員工登入
export function postEmployeeLogin(data: { account: string; password: string }) {
  return request({
    url: `/employee/login`,
    method: 'POST',
    data: {
      account: data.account,
      password: data.password
    }
  })
}
