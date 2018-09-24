import React from 'react';
export default class Help extends React.Component {
  render() {
    const content = `
  <pre style="font-size:14px">
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
        全省站点信息,
        [
          {
            areaCode: 地区id(四位),
            install: 容量,
            power: 发电量
          },
        ]
      }
      区域站点列表(发送cityCode && length=4)
      [
        {
          name: 站点名,
          install: 容量,
          power: 发电量
        },
      ]
      站点逆变器列表(发送siteID && length=10)
      [
        {
          model: 机器型号,
          dayPower: 天发电量
        },
      ]
      
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
      [
        {
          id: 告警逆变器id,
          siteID: 所属站点,
          type: 告警类型(文字),
          time: 告警时间,
          statu: 状态(0: 未处理, 1: 已处理),
        },
      ]
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
