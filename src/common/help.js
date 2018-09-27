import React from 'react';
export default class Help extends React.Component {
  render() {
    const content = `
  <pre style="font-size:14px">
登录页
————————
  登录 （发送agent， password	， userName	）
  ｛
    currentAuthority：	admin，
    status：	ok，
    list：	{
      id：	1，
      username：	xxxx
      role：	admin，
      phone	：123，
      email	：123，
      remark：	213，
      permissionList:['0','1'......],
    }
  ｝
    
首页
——————————
  首页通用数据
    {
      建设中,
      运行中,
      建设目标,
      告警,
      今年已建设,
      装机容量,
      总发电量,
      日发电量,
      碳补偿量,
      日补偿量,
      全省站点信息
      [
        {
          city: 地区id(四位),
          install: 容量,
          power: 发电量
        },
      ],
      全省曲线图
      [
        {
          time: 时间，
          power: 发电量
        },
      ]
    }
  区域站点列表(发送cityCode && length=4)
    {

      siteList:[      //该地区所有站点
        {
          name: 站点名,
          install: 容量,
          power: 发电量
        },
      ],
      timeChart:[     //该地区发电量曲线图
      {
        time:时间，
        power:发电量，
        }, 
      {
        time:时间，
        power:发电量，
        }, 
      ]
    }
      站点逆变器列表(发送siteID && length=10)
      {

      inveterList: [    //该站点所有逆变器
          {
            model: 机器型号,
            dayPower: 天发电量
          },
        ],
      timeChart:[   // 该站点发电量曲线图
            {
              time:时间，
              power:发电量，
              }, 
            {
              time:时间，
              power:发电量，
              }, 
            ]
        ]
      }

站点管理
————————————
站点列表
——————————
  行政规划表
    [
      {
        title: '城市名',
        value: '六位编号',
        children: [
          {
            title: '子代城市名',
            value: '六位编号',
          },
        ]
      },
    ]
  所有站点列表
    [
      {
        name: '站点名称'
        city: '所属区域',
        location: '站点位置',
        buildContain: '建设容量',
        status: '运行状态',
      },
    ],
  筛选列表(发送city, status, 两者至多一项为空)
    [
      {
        city: '所属区域',
        status: '运行状态',
      },
    ],
  新建站点(发送id(站点id), name(站点名), city(6位行政编码), coordinate(坐标), location(位置), designContain(设计容量), buildContain(建设容量), area(占地面积), runStatus(运行状态), netStatus(并网状态), roof(屋顶使用)
    {
      status: success或者failed
    }
    删除站点(发送id(站点id))
    {
      status: success或者failed
    }
    
逆变器列表
——————————
  筛选列表(发送siteID, status, city三者至多两项为空)
    [
      {
        city: '所属区域',
        status: '运行状态',
        siteID: '站点编号'
      },
    ],
  新建逆变器(发送id(逆变器id), siteID(所属站点编号), serial(串号), model(型号), agreement(协议类型), mpptNum(组串总数), pvNum(支路总数)
    {
      status: success或者failed
    }
  删除逆变器(发送id(站点id))
    {
      status: success或者failed
    }
告警管理
_________
  告警列表
  {
    warningDictionary:[
      type:告警类型
    ]，
    list: [
      {
        id:告警编号
        inverterID: 告警逆变器id,
        siteName: 所属站点名,
        type: 告警类型(文字),
        time: 告警时间,
        check: 状态(false: 未处理, true: 已处理),
      },
    ]
  }
  改变告警处理状态 (发送id:告警编号,check)
历史查询
——————————
  站点查询
  ——————————
    所有站点
    [
      {
        value: 'citycode',
        label: '市级名1',
        children: [
          {
            value: 'citycode',
            label: '下一级名1',
            children: [
              {
                value: 'siteID',
                label: '站点名1',
              },
              {
                value: 'siteID',
                label: '站点名2',
              },
            ],
          },
          {
            value: 'citycode',
            label: '下一级名2',
            children: [
              {
                value: 'siteID',
                label: '站点名1',
              },
              {
                value: 'siteID',
                label: '站点名2',
              },
            ],
          },
        ],
      }, 
      {
        value: 'citycode',
        label: '市级名2',
        children: [{
          value: 'citycode',
          label: '下一级名',
          children: [{
            value: 'siteID',
            label: '站点名',
          }],
        }],
    },
    等13个市级。。。
  ]
    站点查询（发送siteID type:查询类型（day:单日，month:整月，year:年），time:时间，具体格式打开控制台改变时间之后可以看到）
    {
      data:[
        {
          time:'00:00',       //无论日月年查询，都用time：，格式：日——00：00，月———“1”，年——“一月”
          "逆变器1”：发电量，
          "逆变器2”：发电量，
          "逆变器3”：发电量，
        },
        {
          time:'01:00',
          "逆变器1”：发电量，
          "逆变器2”：发电量，
          "逆变器3”：发电量，
        },
      ],
      info:{
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
    }
  逆变器查询
  ——————————
  所有逆变器
    [
      {
        value: 'citycode',
        label: '市级名1',
        children: [
          {
            value: 'citycode',
            label: '下一级名1',
            children: [
              {
                value: 'siteID',
                label: '站点名1',
                childern:[
                  {
                    value:'interverID',
                    label:‘interverID‘
                  },
                  {
                    value:'interverID',
                    label:‘interverID‘
                  },
                  {
                    value:'interverID',
                    label:‘interverID‘
                  },
                ]
              },
              {
                value: 'siteID',
                label: '站点名2',
                childern:[
                  {
                    value:'interverID',
                    label:‘interverID‘
                  },
                  {
                    value:'interverID',
                    label:‘interverID‘
                  },
                  {
                    value:'interverID',
                    label:‘interverID‘
                  },
                ]
              },
            ],
          },
          {
            value: 'citycode',
            label: '下一级名2',
            children: [
              {
                value: 'siteID',
                label: '站点名1',
                childern:[
                  {
                    value:'interverID',
                    label:‘interverID‘
                  },
                  {
                    value:'interverID',
                    label:‘interverID‘
                  },
                  {
                    value:'interverID',
                    label:‘interverID‘
                  },
                ]
              },
              {
                value: 'siteID',
                label: '站点名2',
                childern:[
                  {
                    value:'interverID',
                    label:‘interverID‘
                  },
                  {
                    value:'interverID',
                    label:‘interverID‘
                  },
                  {
                    value:'interverID',
                    label:‘interverID‘
                  },
                ]
              },
            ],
          },
        ],
      }, 
      {
        value: 'citycode',
        label: '市级名2',
        children: [{
          value: 'citycode',
          label: '下一级名',
          children: [{
            value: 'siteID',
            label: '站点名',
            childern:[
              {
                value:'interverID',
                label:‘interverID‘
              },
              {
                value:'interverID',
                label:‘interverID‘
              },
              {
                value:'interverID',
                label:‘interverID‘
              },
            ]
          }],
        }],
    },
    等13个市级。。。
  ]
  逆变器查询（发送inverterID type:查询类型（day:单日，month:整月，year:年），time:时间，具体格式打开控制台改变时间之后可以看到）
    {
      data:[
        {
          time:'00:00',       //无论日月年查询，都用time：，格式：日——00：00，月———“1”，年——“一月”
          value:'12312'
        },
        {
          time:'01:00',
          value:'12312'
        },
      ],
      info:{
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
    }
系统管理
————————————  
  用户管理
  —————————————
  权限列表 
    { 
      admin:[permissionID1,permissionID2...],
      wb:[permissionID1,permissionID2...],
      wy:[permissionID1,permissionID2...],
      demo:[permissionID1,permissionID2...],
    }
  用户列表
    {
      [
        userId,
        userType,
        userName,
        tel,
        others,
        email,
      ],
    }
  修改权限 (发送permissionList:[permissionID1,permissionID2...](权限编号数组),userType(admin:管理员，wb：维保，wy：维运，demo:演示))
    {
      statu:ok或error,
      newPermissionList:{
        admin:[permissionID1,permissionID2...],
        wb:[permissionID1,permissionID2...],
        wy:[permissionID1,permissionID2...],
        demo:[permissionID1,permissionID2...],
      }
    }
  添加用户 (发送email：“eamil”，others: "备注"，tel: "手机"，userName: "用户名"，userType: "类型"，其中用户名和类型一定存在))
    {
      email: "sadf",
      others: "fasd",
      tel: "fsadf",
      userName: "fdsaf",
      userType: "wy"
    }
      </pre>`
    return <div dangerouslySetInnerHTML={{ __html: content }} />

  }
}
