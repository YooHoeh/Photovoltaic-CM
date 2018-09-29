import request from '../utils/request';


export async function queryCurrent() {
  // return request('http://172.20.151.36/photovoltaic/public/index/users/info');
  return request('/api/currentUser');
}
