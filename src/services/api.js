import { stringify } from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

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


export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}
export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {

  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function ttt() {
  return request('http://172.20.151.36/photovoltaic/public/index/index/general.html', {
  });
}
export async function historySiteSearch(filter) {
  return request('/api/siteSearch', {
    method: 'POST',
    body: filter
  });
}
export async function fetchCityInfo(cityCode) {
  return request('http://172.20.151.36/photovoltaic/public/index/index/area_ajax', {
    method: 'POST',
    body: cityCode
  });
}
export async function homePage() {
  console.log('homepage api');
  return request('http://172.20.151.36/photovoltaic/public/index/index/general');
}
export async function lll(params) {
  return request('http://172.20.151.36/photovoltaic/public/index/login/index', {
    method: 'POST',
    body: params,
  });
}

export async function getAreaSite(siteCode) {
  return request(`http://172.20.151.36/photovoltaic/public/index/index/area_ajax?sitecode=${stringify(siteCode)}`, {
    method: 'POST',
    body: siteCode,
  });
}
