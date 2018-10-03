import { getSiteList, siteListSearch, addSite, delSite, queryUserList, getMaintenanceID, fetchLogList, interverListSearch, changeWarnStatu, logLostSearch, getInterverList, addInverter, delInverter, updateInverter, getWarningList, warningListSearch, fetchMaintenance, addMaintenance, delMaintenanceLog } from '../services/api';
import { message } from "antd";
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
    siteExcel: []

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
    *changeWarnStatus(payload, { call, put }) {
      const response = yield call(changeWarnStatu, payload);
      response.status == 'success'
        ? message.success('更改处理状态成功')
        : message.error('更改处理状态失败')
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
          siteList: response,
        }
      });

    },
    *addSite(payload, { call, put }) {
      const response = yield call(addSite, payload);
      response.status
        ? message.success('站点添加成功')
        : message.error('站点添加失败')
    },
    *delSite(payload, { call, put }) {
      const response = yield call(delSite, payload);
      response.status == 'success'
        ? message.success('站点删除成功')
        : (response.status == 'cannot')
          ? message.error('站点包含逆变器无法删除！')
          : message.error('站点删除失败')
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
    *interverListSearch(payload, { call, put }) {
      const response = yield call(interverListSearch, payload);
      yield put({
        type: 'saveCommon',
        payload: {
          inverterList: response,
        }
      });
    },
    *addInverter(payload, { call, put }) {
      const response = yield call(addInverter, payload);
      console.log("jklsjaklf;jdsal")
      response.status
        ? message.success('逆变器添加成功')
        : message.error('逆变器添加失败')
    },
    *delInverter(payload, { call, put }) {
      const response = yield call(delSite, payload);
      response.status == 'success'
        ? message.success('逆变器删除成功')
        : message.error('逆变器删除失败')
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
