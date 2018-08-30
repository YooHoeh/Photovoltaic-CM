import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '首页',
    icon: 'dashboard',
    path: 'dashboard/analysis',
  },
  {
    name: '站点管理',
    icon: 'form',
    path: 'list',
    children: [
      {
        name: '站点列表',
        path: 'Site',
      },
      {
        name: '站点监控',
        path: '',
      },
      {
        name: '逆变器列表',
        authority: 'admin',
        path: 'Inverter',
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
        path: '',
      },
      {
        name: '站点查询',
        path: '',
      }

    ],
  },
  {
    name: '告警管理',
    icon: 'warning',
    path: 'warming',
    children: [
      {
        name: '历史告警',
        path: '',
      }
    ],
  },
  {
    name: '系统管理',
    icon: 'check-circle-o',
    path: 'manager',
    children: [
      {
        name: '用户管理',
        path: '',
      },
      {
        name: '系统日志',
        path: '',
      },
    ],
  },
  {
    name: '财务管理',
    icon: 'profile',
    path: 'financial',
  },
  {
    name: '维保管理',
    icon: 'calculator',
    path: 'maintenance ',

  },
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