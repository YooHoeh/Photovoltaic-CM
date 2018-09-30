import { getSiteList, getInterverList, getWarningList, warningListSearch, fetchMaintenance, addMaintenance, delMaintenanceLog } from '../services/api';

export default {
  namespace: 'rule',

  state: {
    siteList: [],
    cityList: [],
    inverterList: [],
    warningList: [],
    warningTagList: [],
    maintenanceList: [],
  },

  effects: {
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
    *fetchMaintenanceList(_, { call, put }) {
      const response = yield call(fetchMaintenance);
      yield put({
        type: 'saveCommon',
        payload: {
          maintenanceList: response.list,
        }
      });
    },
    *addMaintenanceLog(payload, { call, put }) {
      const response = yield call(addMaintenance);
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
