import mockjs from 'mockjs';
import { getRule, postRule } from './mock/rule';
import { getActivities, getNotice, getFakeList } from './mock/api';
import { getFakeChartData } from './mock/chart';
import { getProfileBasicData } from './mock/profile';
import { getProfileAdvancedData } from './mock/profile';
import { getNotices } from './mock/notices';
import { format, delay } from 'roadhog-api-doc';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': {
    $desc: '获取当前用户接口',
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      notifyCount: 12,
    },
  },
  // GET POST 可省略
  'GET /api/rule': getRule,
  'POST /api/rule': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postRule,
  },


  'POST /api/siteSearch':
    (req, res) => {
      res.send(
        {
          data: [
            {
              time: "一月",
              "逆变器1": 25635,
              "逆变器2": 1890,
              "逆变器3": 9314
            },
            {
              time: "二月",
              "逆变器1": 30352,
              "逆变器2": 20439,
              "逆变器3": 10225
            },
            {
              time: "三月",
              "逆变器1": 38253,
              "逆变器2": 42538,
              "逆变器3": 15757
            },
            {
              time: "四月",
              "逆变器1": 51896,
              "逆变器2": 67358,
              "逆变器3": 18794
            },
            {
              time: "五月",
              "逆变器1": 72083,
              "逆变器2": 85640,
              "逆变器3": 22153
            },
            {
              time: "六月",
              "逆变器1": 25635,
              "逆变器2": 1890,
              "逆变器3": 9314
            },
            {
              time: "七月",
              "逆变器1": 30352,
              "逆变器2": 20439,
              "逆变器3": 10225
            },
            {
              time: "八月",
              "逆变器1": 38253,
              "逆变器2": 42538,
              "逆变器3": 15757
            },
            {
              time: "九月",
              "逆变器1": 51896,
              "逆变器2": 67358,
              "逆变器3": 18794
            },
            {
              time: "十月",
              "逆变器1": 72083,
              "逆变器2": 85640,
              "逆变器3": 22153
            },
            {
              time: "十一月",
              "逆变器1": 30352,
              "逆变器2": 20439,
              "逆变器3": 10225
            },
            {
              time: "十二月",
              "逆变器1": 38253,
              "逆变器2": 42538,
              "逆变器3": 15757
            }],
          info: {
            name: "光伏电站001",
            position: "河南省郑州市中华园区北城街",
            coordinate: "113.123124,224.123454",
            disignCount: "50000kW",
            buildCount: "48000kW",
            totalPower: "60000kW",
            runState: "建设中",
            netState: "已并网",
            roof: "租赁",
            area: "200㎡"
          }
        })
    },
  'POST /api/inverterSearch':
    (req, res) => {
      res.send(
        {
          data: [
            {
              time: "1951",
              value: 38
            },
            {
              time: "1952",
              value: 52
            },
            {
              time: "1956",
              value: 61
            },
            {
              time: "1957",
              value: 145
            },
            {
              time: "1958",
              value: 48
            },
            {
              time: "1959",
              value: 38
            },
            {
              time: "1960",
              value: 38
            },
            {
              time: "1962",
              value: 38
            }
          ],
          info: {
            site: "光伏电站001",
            id: "410001A001011001",
            model: "某型号",
            serial: "某串号",
            agreement: "三相协议",
            mpptNum: "12",
            pvNum: "4",
            runState: "待机",
            date: " Sep 13 2018 09:11:36",
            totalPower: "2000kW"
          }
        })
    },
  'POST /api/login/account': (req, res) => {
    const { password, userName, type } = req.body;
    if (password === '14e1b600b1fd579f47433b88e8d85291' && userName === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }
    if (password === '123456' && userName === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      return;
    }
    res.send({
      status: '1',
      currentAuthority: 'guest',
    });
  },

  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
};

export default (noProxy ? {} : delay(proxy, 1000));
