import { queryCurrent, addUser, deleteUser, updateRole, updateUserProfile, updateUserPsk } from '../services/api';
import { message } from 'antd';
// import React from 'react'

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *addUser(payload, { call, put }) {
      const response = yield call(addUser, payload.payload);
      response.status == 'success'
        ? message.success('添加用户成功')
        : message.error('添加用户失败')
      yield put({
        type: 'fetchCurrent',
      });
    },
    *delUser(payload, { call, put }) {
      const response = yield call(deleteUser, payload);
      response.status == 'success'
        ? message.success('删除用户成功')
        : message.error('删除用户失败')

    },
    *UpdateUserRole(payload, { call, put }) {
      const response = yield call(updateRole, payload);
      response.status
        ? message.success('更新角色身份成功')
        : message.error('更新角色身份失败')
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *UpdateUserProfile(payload, { call }) {
      const response = yield call(updateUserProfile, payload);
      response.status == 'success'
        ? message.success('资料修改成功')
        : message.error('资料修改失败')

    },
    *UpdateUserPsk(payload, { call }) {
      const response = yield call(updateUserPsk, payload);
      response.status == 'success'
        ? message.success('密码修改成功')
        : message.error('密码修改失败,请检查您的原密码是否正确，如有问题请联系管理员')
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
