import { stringify } from 'qs';
import request from '../utils/request';

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function getSiteList() {
  return request('http://172.20.151.36/photovoltaic/public/index/stations', {
  });
}
export async function getWarningList() {
  return request('http://172.20.151.36/photovoltaic/public/index/warnings/list', {
  });
}
export async function getInterverList() {
  return request('http://172.20.151.36/photovoltaic/public/index/inverters', {
  });
}
export async function historySiteSearch(filter) {
  return request('/api/siteSearch', {
    method: 'POST',
    body: filter.payload
  });
}
export async function historyInverterSearch(filter) {
  return request('/api/inverterSearch', {
    method: 'POST',
    body: filter.payload
  });
}
export async function fetchCityInfo(cityCode) {
  return request('http://172.20.151.36/photovoltaic/public/index/index/area_ajax', {
    method: 'POST',
    body: cityCode.payload
  });
}
export async function fetchSiteInfo(siteID) {
  return request('http://172.20.151.36/photovoltaic/public/index/index/station_ajax', {
    method: 'POST',
    body: siteID.payload
  });
}
export async function homePage() {
  return request('http://172.20.151.36/photovoltaic/public/index/index/general');
}
export async function getUserInfo() {
  return request('http://172.20.151.36/photovoltaic/public/index/users/info');
}
export async function logOut() {
  return request('http://172.20.151.36/photovoltaic/public/index/login/logout');
}
export async function logIn(params) {
  return request('http://172.20.151.36/photovoltaic/public/index/login/index', {
    method: 'POST',
    body: params,
  });
}


