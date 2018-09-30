import request from '../utils/request';

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}
export async function queryError(code) {
  return request(`/api/${code}`);
}
//注销
export async function logOut() {
  return request('http://172.20.151.36/photovoltaic/public/index/login/logout');
}

//登录
export async function logIn(params) {
  return request('http://172.20.151.36/photovoltaic/public/index/login/index', {
    method: 'POST',
    body: params,
  });
}


//获取当前用户信息
export async function queryCurrent() {
  return request('http://172.20.151.36/photovoltaic/public/index/users/info');
  // return request('/api/currentUser');
}
//获取用户列表
export async function queryUserList() {
  return request('http://172.20.151.36/photovoltaic/public/index/users/list');
}
//获取权限列表
export async function queryPermissionList() {
  return request('http://172.20.151.36/photovoltaic/public/index/users/control_list');
}
//更新用户资料
export async function updateUserProfile(newProfile) {
  return request('http://172.20.151.36/photovoltaic/public/index/users/update_info', {
    method: 'POST',
    body: newProfile.payload
  });
}
//修改密码
export async function updateUserPsk(newPsk) {
  return request('http://172.20.151.36/photovoltaic/public/index/users/modify_pass', {
    method: 'POST',
    body: newPsk.payload
  });
}
//删除用户
export async function deleteUser(userID) {
  return request('http://172.20.151.36/photovoltaic/public/index/users/delete', {
    method: 'POST',
    body: userID.payload
  });
}
//修改用户角色
export async function updateRole(payload) {
  return request('http://172.20.151.36/photovoltaic/public/index/users/update_role', {
    method: 'POST',
    body: payload
  });
}
//新建用户
export async function addUser(payload) {
  return request('http://172.20.151.36/photovoltaic/public/index/users/add', {
    method: 'POST',
    body: payload
  });
}
//编辑权限
export async function permissionEdit(payload) {
  return request('http://172.20.151.36/photovoltaic/public/index/users/control', {
    method: 'POST',
    body: payload
  });
}

//首页基本数据
export async function homePage() {
  return request('http://172.20.151.36/photovoltaic/public/index/index/general');
}

//获取区域点击数据
export async function fetchCityInfo(cityCode) {
  return request('http://172.20.151.36/photovoltaic/public/index/index/area_ajax', {
    method: 'POST',
    body: cityCode.payload
  });
}
//获取站点点击数据
export async function fetchSiteInfo(siteID) {
  return request('http://172.20.151.36/photovoltaic/public/index/index/station_ajax', {
    method: 'POST',
    body: siteID.payload
  });
}

//获取维保日志列表
export async function fetchMaintenance() {
  return request('172.20.151.36/photovoltaic/public/index/logs/query');
}

//维保日志查询
export async function maintenanceSearch(cityCode) {
  return request('http://172.20.151.36/photovoltaic/public/index/logs/queryTime', {
    method: 'POST',
    body: cityCode.payload
  });
}
//添加维保日志
export async function addMaintenance(payload) {
  return request('http://172.20.151.36/photovoltaic/public/index/logs/addMaintenance', {
    method: 'POST',
    body: payload
  });
}




//获取告警列表
export async function getWarningList() {
  return request('http://172.20.151.36/photovoltaic/public/index/warnings/list', {
  });
}
//获取告警列表
export async function warningListSearch(payload) {
  return request('http://172.20.151.36/photovoltaic/public/index/warnings/querylist', {
    method: 'POST',
    body: payload.payload
  });
}
//获取站点列表
export async function getSiteList() {
  return request('http://172.20.151.36/photovoltaic/public/index/stations', {
  });
}
//获取带位置的站点列表
export async function getSiteListWithPosition() {
  return request('http://172.20.151.36/photovoltaic/public/index/stations/initquery', {
  });
}
//获取逆变器列表
export async function getInterverList() {
  return request('http://172.20.151.36/photovoltaic/public/index/inverters', {
  });
}
//获取带位置的逆变器列表
export async function getInverterListWithPosition() {
  return request('http://172.20.151.36/photovoltaic/public/index/inverters/initquery', {
  });
}
//站点历史搜索
export async function historySiteSearch(filter) {
  // return request('/api/siteSearch', {
  return request('http://172.20.151.36/photovoltaic/public/index/stations/queryChart', {
    method: 'POST',
    body: filter.payload
  });
}
//逆变器历史搜索
export async function historyInverterSearch(filter) {
  return request('/api/inverterSearch', {
    method: 'POST',
    body: filter.payload
  });
}


