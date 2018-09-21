import React, { PureComponent, Fragment } from 'react';
import { Card, Button, Form, Input, Select, Tree, Transfer, Modal, Table, Divider, Tag } from 'antd'
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
const columns = [{
  title: '用户编号',
  dataIndex: 'userID',
  key: 'userID',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: '角色类型',
  dataIndex: 'userType',
  key: 'userType',
  filters: [
    { text: '超级管理员', value: '0' },
    { text: '管理员', value: '1' },
    { text: '维运人员', value: '2' },
    { text: '维保人员', value: '3' },
    { text: '演示', value: '4' },
  ],
  sorter: (a, b) => parseInt(a.userType) - parseInt(b.userType),
  render: (text, recode) => {
    switch (recode.userType) {
      case '0':
        return <span>超级管理员</span>;
      case '1':
        return <span>管理员</span>;
      case '2':
        return <span>维运人员</span>;
      case '3':
        return <span>维保人员</span>;
      case '4':
        return <span>演示</span>;
    }
  },
  onFilter: (value, record) => record.userType === value,
}, {
  title: '用户名',
  dataIndex: 'userName',
  key: 'userName',
}, {
  title: '联系电话',
  dataIndex: 'tel',
  key: 'tel',
}, {
  title: '备注',
  dataIndex: 'others',
  key: 'others',
}, {
  title: '管理权限',
  key: 'action',
  align: 'right',
  render: (text, record) => (
    <span>
      <a href="javascript:;">管理权限</a>
      <Divider type='vertical' />
      <a href="javascript:;">删除用户</a>

    </span>
  ),
}];

const data = [
  {
    userID: '123',
    userName: 'aa',
    userType: '1',
    tel: '12133211331',
    others: '这是备注',
  },
  {
    userID: '123',
    userName: 'aa',
    userType: '0',
    tel: '12133211331',
    others: '这是备注',
  },
  {
    userID: '123',
    userName: 'aa',
    userType: '2',
    tel: '12133211331',
    others: '这是备注',
  },
  {
    userID: '123',
    userName: 'aa',
    userType: '2',
    tel: '12133211331',
    others: '这是备注',
  },
  {
    userID: '123',
    userName: 'aa',
    userType: '2',
    tel: '12133211331',
    others: '这是备注',
  },
  {
    userID: '123',
    userName: 'aa',
    userType: '4',
    tel: '12133211331',
    others: '这是备注',
  },
  {
    userID: '123',
    userName: 'aa',
    userType: '3',
    tel: '12133211331',
    others: '这是备注',
  },
];

class UserManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {

    return (
      <PageHeaderLayout title="用户管理">
        <Card >
          <Button type="primary" style={{ margin: "8px 0" }}>添加用户</Button>
          <Table columns={columns} dataSource={data} />
        </Card>
      </PageHeaderLayout>
    )
  }
}
export default UserManager;
