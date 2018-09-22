import { isUrl } from '../utils/utils';

export const menuData = [
  {
    name: '首页',
    icon: 'dashboard',
    path: 'dashboard',
  },
  {
    name: '告警管理',
    icon: 'warning',
    path: 'warning',
  },
  {
    name: '财务管理',
    icon: 'calculator',
    path: 'financial',
  },
  {
    name: '站点管理',
    icon: 'form',
    path: 'list',
    children: [
      {
        name: '站点列表',
        path: 'site',
      },
      {
        name: '逆变器列表',
        path: 'inverter',
      },

      {
        name: '站点监控',
        authority: 'admin',
        path: '',
      },
    ],
  },
  {
    name: '历史查询',
    icon: 'table',
    path: 'history',
    children: [
      {
        name: '逆变器查询',
        path: 'inverter',
      },
      {
        name: '站点查询',
        path: 'site',
      }

    ],
  },
  {
    name: '维保管理',
    icon: 'profile',
    path: 'maintenance',
    children: [
      {
        name: '维保日志列表',
        path: 'list'
      },
      {
        name: '新建维保日志',
        path: 'add'
      }
    ]
  }, {
    name: '系统管理',
    icon: 'setting',
    path: 'manager',
    children: [
      {
        name: '用户管理',
        path: 'user',
      },
      {
        name: '系统日志',
        path: 'log',
      },
    ],
  }, {
    name: '账户管理',
    icon: 'user',
    path: 'profile',
  }
];


function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);