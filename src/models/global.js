import { homePage, fetchCityInfo, fetchSiteInfo } from '../services/api';
export default {
  namespace: 'global',

  state: {
    collapsed: true,
    notices: [],
    city: "郑州",
    weather: {},
    mapView: "", //判断显示地区地图还是站点地图
    allHomePageInfo: {},
    inverterList: [],
    siteList: [],
    timeChart: [],
  },

  effects: {
    *fetchNotices(_, { call, put }) {
      const data = yield call(queryNotices);
      yield put({
        type: 'saveNotices',
        payload: data,
      });
      yield put({
        type: 'user/changeNotifyCount',
        payload: data.length,
      });
    },
    *fetchCityInfo(payload, { call, put }) {
      const data = yield call(fetchCityInfo, payload);
      yield put({
        type: 'save',
        payload: {
          siteList: data.siteList,
        }
      });
      yield put({
        type: 'save',
        payload: {
          timeChart: data.timeChart,
        }
      });
    },

    *fetchSiteInfo(payload, { call, put }) {
      const data = yield call(fetchSiteInfo, payload);
      yield put({
        type: 'save',
        payload: {
          inverterList: data.inverterList,
        }
      });
      yield put({
        type: 'save',
        payload: {
          timeChart: data.timeChart,
        }
      });
    },

    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count = yield select(state => state.global.notices.length);
      yield put({
        type: 'user/changeNotifyCount',
        payload: count,
      });
    },
    *getHomePageInfo(_, { call, put }) {
      const response = yield call(homePage);
      yield put({
        type: 'save',
        payload: {
          allHomePageInfo: response,
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
    saveWeather(state, { payload }) {
      return {
        ...state,
        weather: payload
      }
    },
    saveHomePageInfo(state, { payload }) {
      return {
        ...state,
        allHomePageInfo: payload
      }
    },
    saveCity(state, { payload }) {
      return {
        ...state,
        city: payload
      }
    },
    saveSite(state, { payload }) {
      return {
        ...state,
        siteID: payload.siteID,
        siteName: payload.siteName,
      }
    },
    changeMapView(state, { payload }) {
      return {
        ...state,
        mapView: payload,

      }
    },
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveNotices(state, { payload }) {
      return {
        ...state,
        notices: payload,
      };
    },
    saveClearedNotices(state, { payload }) {
      return {
        ...state,
        notices: state.notices.filter(item => item.type !== payload),
      };
    },
  },

  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
