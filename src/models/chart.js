import { historySiteSearch, historyInverterSearch, getSiteListWithPosition, getInverterListWithPosition } from '../services/api';

export default {
  namespace: 'chart',

  state: {
    siteListWithPosition: [],
    inverterListWithPosition: [],
    historySiteSearchData: {},
    historyInverterSearchData: {}
  },

  effects: {
    *fetchSiteListWithPosition(_, { call, put }) {
      const response = yield call(getSiteListWithPosition);
      yield put({
        type: 'save',
        payload: {
          siteListWithPosition: response,
        },
      });
    },
    *fetchInverterListWithPosition(_, { call, put }) {
      const response = yield call(getInverterListWithPosition);
      yield put({
        type: 'save',
        payload: {
          siteListWithPosition: response,
        },
      });
    },
    *fetchHistorySiteSearchData(filter, { call, put }) {
      const response = yield call(historySiteSearch, filter);
      yield put({
        type: 'save',
        payload: {
          historySiteSearchData: response,
        },
      });
    },
    *fetchHistoryInverterSearchData(filter, { call, put }) {
      const response = yield call(historyInverterSearch, filter);
      yield put({
        type: 'save',
        payload: {
          historyInverterSearchData: response,
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
