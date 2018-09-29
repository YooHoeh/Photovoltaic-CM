import { getSiteList, getInterverList, getWarningList } from '../services/api';

export default {
  namespace: 'rule',

  state: {
    siteList: [],
    cityList: [],
    inverterList: [],
    warningList: [],
    warningTagList: [],
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
