export default {
    namespace: 'weather',

    state: {
        weatherInfo: {},
    },

    effects: {
        // *weather(_, { call, put, select }) {
        //     const response = yield call(saveWeather)
        //     const weather = yield put(saveWeather)
        // }
    },
    subscriptions: {
        setup({ dispatch, history }) {

        },
    },
    reducers: {
        saveWeather(state, { payload }) {
            console.log('bingo')
            return {
                ...state,
                weather: payload
            }
        },
    },
};
