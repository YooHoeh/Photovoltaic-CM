import { queryNotices, homePage, } from '../services/api';
export default {
  namespace: 'global',

  state: {
    collapsed: true,
    notices: [],
    city: "郑州",
    weather: {},
    mapView: "city", //判断显示地区地图还是站点地图
    allHomePageInfo: "",
    installNum: '',
    totalPower: '',
    dayPower: '',
    carbon: '',
    dayCarbon: '',
    allStation: [],
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
      console.log("get home page" + response.username)
      yield put({
        type: 'save',
        payload: {
          allHomePageInfo: response,
        },
      });
      yield put({
        type: 'save',
        payload: {
          installNum: response.s_install,
        },
      });
      yield put({
        type: 'save',
        payload: {
          totalPower: response.s_total_power,
        },
      });
      yield put({
        type: 'save',
        payload: {
          dayPower: response.s_day_power,
        },
      });
      yield put({
        type: 'save',
        payload: {
          carbon: response.s_e_d_carbon,
        },
      });
      yield put({
        type: 'save',
        payload: {
          dayCarbon: response.s_e_d_day_carbon,
        },
      });
      yield put({
        type: 'save',
        payload: {
          allStation: response.area_station,
        },
      });
    },
  },
  reducers: {
    save(state, { payload }) {
      console.log("save" + payload)
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
      console.log("save HomePageInfo")
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
