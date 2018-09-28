import { queryRule, removeRule, addRule, getSiteList } from '../services/api';

export default {
  namespace: 'rule',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    siteList: [],
    cityList: [],
  },

  effects: {

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
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
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
