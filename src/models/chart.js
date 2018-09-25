import { fakeChartData, ttt, historySiteSearch } from '../services/api';

export default {
  namespace: 'chart',

  state: {
    visitData: [],
    visitData2: [],
    salesData: [],
    searchData: [],
    offlineData: [],
    offlineChartData: [],
    salesTypeData: [],
    salesTypeDataOnline: [],
    salesTypeDataOffline: [],
    radarData: [],
    loading: false,
    tt: [],
    historySiteSearchData: {}
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchSalesData(_, { call, put }) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: {
          salesData: response.salesData,
        },
      });
    },
    *fetchHistorySiteSearchData(filter, { call, put }) {
      const response = yield call(historySiteSearch,filter);
      yield put({
        type: 'save',
        payload: {
          historySiteSearchData: response,
        },
      });
    },
    *ttt(_, { call, put }) {
      const response = yield call(ttt);
      console.log(response);
      yield put({
        type: 'save',
        payload: {
          tt: response,
        },
      }
      );
      console.log(response);
      console.log('activi');
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return {
        visitData: [],
        visitData2: [],
        salesData: [],
        searchData: [],
        offlineData: [],
        offlineChartData: [],
        salesTypeData: [],
        salesTypeDataOnline: [],
        salesTypeDataOffline: [],
        radarData: [],
        tt: []

      };
    },
  },
};
