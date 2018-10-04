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
  return request('../public/index/login/logout');
}

//登录
export async function logIn(params) {
  return request('../public/index/login/index', {
    method: 'POST',
    body: params,
  });
}

//获取当前用户信息
export async function queryCurrent() {
  return request('../public/index/users/info', { method: 'POST' });
  // return request('/api/currentUser');
}
//获取用户列表
export async function queryUserList() {
  return request('../public/index/users/list', { method: 'POST', });
}
//获取权限列表
export async function queryPermissionList() {
  return request('../public/index/users/control_list', { method: 'POST', });
}
//更新用户资料
export async function updateUserProfile(newProfile) {
  return request('../public/index/users/update_info', {
    method: 'POST',
    body: newProfile.payload
  });
}
//修改密码
export async function updateUserPsk(newPsk) {
  return request('../public/index/users/modify_pass', {
    method: 'POST',
    body: newPsk.payload
  });
}
//删除用户
export async function deleteUser(userID) {
  return request('../public/index/users/delete', {
    method: 'POST',
    body: userID.payload
  });
}
//修改用户角色
export async function updateRole(payload) {
  return request('../public/index/users/update_role', {
    method: 'POST',
    body: payload.payload
  });
}
//新建用户
export async function addUser(payload) {
  return request('../public/index/users/add', {
    method: 'POST',
    body: payload
  });
}
//编辑权限
export async function permissionEdit(payload) {
  return request('../public/index/users/control', {
    method: 'POST',
    body: payload
  });
}

//首页基本数据
export async function homePage() {
  return request('../public/index/index/general', { method: 'POST', });
}

//获取区域点击数据
export async function fetchCityInfo(cityCode) {
  return request('../public/index/index/area_ajax', {
    method: 'POST',
    body: cityCode.payload
  });
}
//获取站点点击数据
export async function fetchSiteInfo(siteID) {
  return request('../public/index/index/station_ajax', {
    method: 'POST',
    body: siteID.payload
  });
}

//获取维保日志列表
export async function fetchMaintenance() {
  return request('../public/index/logs/query', { method: 'POST', });
}

//维保日志查询
export async function maintenanceSearch(id) {
  return request('../public/index/logs/queryTime', {
    method: 'POST',
    body: id.payload
  });
}
//获取维保日志流水号
export async function getMaintenanceID() {
  return request('../public/index/logs/maintenanceId', {
    method: 'POST',
  });
}

//添加维保日志
export async function addMaintenance(payload) {
  return request('../public/index/logs/addMaintenance', {
    method: 'POST',
    body: payload.payload
  });
}
//删除维保日志
export async function delMaintenanceLog(payload) {
  return request('../public/index/logs/addMaintenance', {
    method: 'POST',
    body: payload.payload
  });
}

//获取告警列表
export async function getWarningList() {
  return request('../public/index/warnings/list', {
    method: 'POST',
  });
}
//告警列表搜索
export async function warningListSearch(payload) {
  return request('../public/index/warnings/querylist', {
    method: 'POST',
    body: payload.payload
  });
}
//改变告警状态
export async function changeWarnStatu(id) {
  return request('../public/index/warnings/status', {
    method: 'POST',
    body: id.payload
  });
}
//获取站点列表
export async function getSiteList() {
  return request('../public/index/stations', {
    method: 'POST',
  });
}
//站点列表搜索
export async function siteListSearch(payload) {
  return request('../public/index/stations/station_screen', {
    method: 'POST',
    body: payload.payload
  });
}
//获取带位置的站点列表
export async function getSiteListWithPosition() {
  return request('../public/index/stations/initquery', {
    method: 'POST',
  });
}
//新建站点
export async function addSite(site) {
  return request('../public/index/stations/add', {
    method: 'POST',
    body: site.payload
  });
}
//修改站点信息
export async function updateSite(site) {
  return request('../public/index/stations/update', {
    method: 'POST',
    body: site
  });
}
//删除站点
export async function delSite(site) {
  console.log(site.payload)
  return request('../public/index/stations/delete', {
    method: 'POST',
    body: site.payload
  });
}
//获取逆变器列表
export async function getInterverList() {
  return request('../public/index/inverters', {
    method: 'POST',
  });
}
//逆变器搜索
export async function interverListSearch(payload) {
  return request('../public/index/inverters/query', {
    method: 'POST',
    body: payload.payload
  });
}
//获取带位置的逆变器列表
export async function getInverterListWithPosition() {
  return request('../public/index/inverters/initquery', {
    method: 'POST',
  });
}
//新建逆变器
export async function addInverter(inverter) {
  return request('../public/index/inverters/add', {
    method: 'POST',
    body: inverter.payload
  });
}
//修改逆变器信息
export async function updateInverter(inverter) {
  return request('../public/index/inverters/update', {
    method: 'POST',
    body: inverter
  });
}
//删除逆变器
export async function delInverter(inverter) {
  console.log(site.payload)
  return request('../public/index/inverters/delete', {
    method: 'POST',
    body: inverter.payload
  });
}
//站点历史搜索
export async function historySiteSearch(filter) {
  return request('../public/index/stations/queryChart', {
    method: 'POST',
    body: filter.fileter
  });
}
//逆变器历史搜索
export async function historyInverterSearch(filter) {
  return request('../public/index/inverters/queryChart', {
    method: 'POST',
    body: filter.fileter
  });
}

//操作日志列表
export async function fetchLogList() {
  return request('../public/index/logs/logList', {
    method: 'POST',
  });
}
//操作日志搜索
export async function logLostSearch(filter) {
  return request('../public/index/logs/queryLog', {
    method: 'POST',
    body: filter.payload
  });
}


