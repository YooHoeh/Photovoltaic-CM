import { historySiteSearch, historyInverterSearch } from '../services/api';

export default {
  namespace: 'chart',

  state: {
    historySiteSearchData: {},
    historyInverterSearchData: {}
  },

  effects: {
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
