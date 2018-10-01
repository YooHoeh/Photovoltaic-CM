import { getSiteList, siteListSearch, addSite, queryUserList, fetchLogList, logLostSearch, getInterverList, getWarningList, warningListSearch, fetchMaintenance, addMaintenance, delMaintenanceLog } from '../services/api';
import { message } from "react";
export default {
  namespace: 'rule',

  state: {
    siteList: [],
    cityList: [],
    inverterList: [],
    warningList: [],
    warningTagList: [],
    maintenanceList: [],
    logList: [],
    userList: [],
    maintenanceID: '',

  },

  effects: {
    *fetchUserList(_, { call, put }) {
      const response = yield call(queryUserList);
      yield put({
        type: 'saveCommon',
        payload: {
          userList: response,
        }
      });
      yield put({
        type: 'saveCommon',
        payload: {
          warningTagList: response.dlist,
        }
      });
    },
    *fetchWarningList(_, { call, put }) {
      const response = yield call(getWarningList);
      yield put({
        type: 'saveCommon',
        payload: {
          warningList: response.list,
        }
      });
      yield put({
        type: 'saveCommon',
        payload: {
          warningTagList: response.dlist,
        }
      });
    },
    *searchWarningList(payload, { call, put }) {
      const response = yield call(warningListSearch, payload);
      yield put({
        type: 'saveCommon',
        payload: {
          warningList: response.list,
        }
      });

    },
    *fetchSiteList(_, { call, put }) {
      const response = yield call(getSiteList);
      yield put({
        type: 'saveCommon',
        payload: {
          siteList: response.list,
        }
      });
      yield put({
        type: 'saveCommon',
        payload: {
          cityList: response.areas,
        }
      });
    },
    *siteListSearch(payload, { call, put }) {
      const response = yield call(siteListSearch, payload);
      yield put({
        type: 'saveCommon',
        payload: {
          siteList: response.list,
        }
      });
      yield put({
        type: 'saveCommon',
        payload: {
          cityList: response.areas,
        }
      });
    },
    *addSite(payload, { call, put }) {
      const response = yield call(addSite, payload);
      response.status
        ? message.success('密码修改成功')
        : message.error('密码修改失败')
    },
    *fetchInverterList(_, { call, put }) {
      const response = yield call(getInterverList);
      yield put({
        type: 'saveCommon',
        payload: {
          inverterList: response.list,
        }
      });
      yield put({
        type: 'saveCommon',
        payload: {
          cityList: response.areas,
        }
      });
    },
    *fetchMaintenanceID(_, { call, put }) {
      const response = yield call(getMaintenanceID);
      yield put({
        type: 'saveCommon',
        payload: {
          maintenanceID: response,
        }
      });
    },
    *fetchMaintenanceList(_, { call, put }) {
      const response = yield call(fetchMaintenance);
      yield put({
        type: 'saveCommon',
        payload: {
          maintenanceList: response,
        }
      });
    },
    *logLostSearch(payload, { call, put }) {
      const response = yield call(logLostSearch, payload);
      yield put({
        type: 'saveCommon',
        payload: {
          logList: response
        }
      });
    },
    *fetchLogList(_, { call, put }) {
      const response = yield call(fetchLogList);
      yield put({
        type: 'saveCommon',
        payload: {
          logList: response,
        }
      });
    },
    *addMaintenanceLog(payload, { call, put }) {
      const response = yield call(addMaintenance, payload);
      yield put({
        type: 'saveCommon',
        payload: {
          maintenanceList: response.list,
        }
      });
    },
    *delMaintenanceLog(payload, { call, put }) {
      const response = yield call(delMaintenance);
      yield put({
        type: 'saveCommon',
        payload: {
          maintenanceList: response.list,
        }
      });
    },
  },

  reducers: {
    saveCommon(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
