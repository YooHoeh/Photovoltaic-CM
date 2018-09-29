import { isUrl } from '../utils/utils';

export const menuData = [
  {
    name: '首页',
    icon: 'bar-chart',
    path: 'dashboard',
    id: '0'
  },
  {
    name: '告警管理',
    icon: 'warning',
    path: 'warning',
    id: "1"
  },
  {
    name: '财务管理',
    icon: 'dollar',
    path: 'financial',
    id: "2"
  },

  {
    name: '站点管理',
    icon: 'bars',
    path: 'list',
    id: "3",
    children: [
      {
        name: '站点列表',
        icon: 'thunderbolt',
        path: 'site',
        id: "4",
      },
      {
        name: '逆变器列表',
        icon: 'box-plot',
        path: 'inverter',
        id: "5",
      },

      {
        name: '站点监控',
        icon: 'cluster',
        path: '',
        id: "6",
      },
    ],
  },
  {
    name: '历史查询',
    icon: 'search',
    path: 'history',
    id: "7",
    children: [
      {
        name: '站点查询',
        path: 'site',
        icon: 'thunderbolt',
        id: "9",
      },
      {
        name: '逆变器查询',
        icon: 'box-plot',
        path: 'inverter',
        id: "8",
      },

    ],
  },
  {
    name: '维保管理',
    icon: 'tool',
    path: 'maintenance',
    id: "10",
    children: [
      {
        name: '维保日志列表',
        path: 'list',
        icon: 'insurance',
        id: "11",
      },
      {
        name: '新建维保日志',
        icon: 'reconciliation',
        path: 'add',
        id: "12",
      }
    ]
  }, {
    name: '系统管理',
    icon: 'setting',
    path: 'manager',
    id: "13",
    children: [
      {
        name: '用户管理',
        path: 'user',
        icon: 'solution',
        id: "14",
      },
      {
        name: '系统日志',
        icon: 'database',
        path: 'log',
        id: "15",
      },
    ],
  }, {
    name: '账户管理',
    icon: 'user',
    path: 'profile',
    id: '16'
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