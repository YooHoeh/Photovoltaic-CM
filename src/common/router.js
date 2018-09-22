import React, { createElement } from 'react';
import { Spin } from 'antd';
import pathToRegexp from 'path-to-regexp';
import Loadable from 'react-loadable';
import { getMenuData } from './menu';

let routerDataCache;

const getRouterDataCache = app => {
  if (!routerDataCache) {
    routerDataCache = getRouterData(app);
  }
  return routerDataCache;
};

const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // register models
  models.forEach(model => {
    if (modelNotExisted(app, model)) {
      // eslint-disable-next-line
      app.model(require(`../models/${model}`).default);
    }
  });

  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    return props => {
      return createElement(component().default, {
        ...props,
        routerData: getRouterDataCache(app),
      });
    };
  }
  // () => import('module')
  return Loadable({
    loader: () => {
      return component().then(raw => {
        const Component = raw.default || raw;
        return props =>
          createElement(Component, {
            ...props,
            routerData: getRouterDataCache(app),
          });
      });
    },
    loading: () => {
      return <Spin size="large" className="global-spin" />;
    },
  });
};

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach(item => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}

function findMenuKey(menuData, path) {
  const menuKey = Object.keys(menuData).find(key => pathToRegexp(path).test(key));
  if (menuKey == null) {
    if (path === '/') {
      return null;
    }
    const lastIdx = path.lastIndexOf('/');
    if (lastIdx < 0) {
      return null;
    }
    if (lastIdx === 0) {
      return findMenuKey(menuData, '/');
    }
    // 如果没有，使用上一层的配置
    return findMenuKey(menuData, path.substr(0, lastIdx));
  }
  return menuKey;
}
export const getRouterData = app => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
    },
    '//': {
      component: dynamicWrapper(app, ['user', 'login'], () => import('../routes/Dashboard/Analysis')),
    },
    '/dashboard': {
      component: dynamicWrapper(app, ['chart', 'global'], () => import('../routes/Dashboard/Analysis')),
    },
    '/list/site': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/List/Site')),
    },
    '/list/inverter': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/List/Inverter')),
    },
    '/history/inverter': {
      component: dynamicWrapper(app, ['global'], () => import('../routes/History/Inverter')),
    },
    '/warning': {
      component: dynamicWrapper(app, ['global'], () => import('../routes/Warning')),
    },
    '/history/site': {
      component: dynamicWrapper(app, ['global'], () => import('../routes/History/Site')),
    },
    '/maintenance/add': {
      component: dynamicWrapper(app, ['global'], () => import('../routes/Maintenance/AddNewLog')),
    },
    '/maintenance/list': {
      component: dynamicWrapper(app, ['global'], () => import('../routes/Maintenance/LogList')),
    },
    '/manager/user': {
      component: dynamicWrapper(app, [], () => import('../routes/Manager/UserManager')),
    },
    '/manager/log': {
      component: dynamicWrapper(app, [], () => import('../routes/Manager/SystemLog')),
    },
    '/profile': {
      component: dynamicWrapper(app, [], () => import('../routes/Profile')),
    },
    '/exception/403': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    '/exception/404': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
    },
    '/exception/500': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/500')),
    },
    '/exception/trigger': {
      component: dynamicWrapper(app, ['error'], () => import('../routes/Exception/triggerException')),
    },
    '/user': {
      component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    },
    '/user/login': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
    },

    // '/user/:id': {
    //   component: dynamicWrapper(app, [], () => import('../routes/User/SomeComponent')),
    // },
  };
  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData());

  // Route configuration data
  // eg. {name,authority ...routerConfig }
  const routerData = {};
  // The route matches the menu
  Object.keys(routerConfig).forEach(path => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
    let menuKey = Object.keys(menuData).find(key => pathToRegexp(path).test(`${key}`));
    const inherited = menuKey == null;
    if (menuKey == null) {
      menuKey = findMenuKey(menuData, path);
    }
    let menuItem = {};
    // If menuKey is not empty
    if (menuKey) {
      menuItem = menuData[menuKey];
    }
    let router = routerConfig[path];
    // If you need to configure complex parameter routing,
    // https://github.com/ant-design/ant-design-pro-site/blob/master/docs/router-and-nav.md#%E5%B8%A6%E5%8F%82%E6%95%B0%E7%9A%84%E8%B7%AF%E7%94%B1%E8%8F%9C%E5%8D%95
    // eg . /list/:type/user/info/:id
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
      hideInBreadcrumb: router.hideInBreadcrumb || menuItem.hideInBreadcrumb,
      inherited,
    };
    routerData[path] = router;
  });
  return routerData;
};
