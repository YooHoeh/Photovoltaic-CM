import React, { PureComponent, Fragment } from 'react';
import { Card, Button, Form, Input, Select, Tree, Transfer, Modal, Table, Divider, Tag, Radio } from 'antd'
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const FormItem = Form.Item;
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
      <a href="javascript:;">修改角色</a>
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

const NewUser = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (

        <Form>
          <FormItem label="用户名">
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入用户名' }],
            })(
              <Input />
            )}
          </FormItem>

          <FormItem label="账户类型">
            {getFieldDecorator('userType', {
              initialValue: 'admin',
              rules: [{ required: true, message: '必须选择用户类型' }],
            })(
              <Radio.Group>
                <Radio value="suAdmin">超级管理员</Radio>
                <Radio value="admin">管理员</Radio>
                <Radio value="VT">维运人员</Radio>
                <Radio value="VP">维保人员</Radio>
                <Radio value="demo">演示</Radio>
              </Radio.Group>
            )}
          </FormItem>
        </Form >

      )
    }
  })
class UserManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newUserVisibale: false,
      permissionVisbale: false
    };
  }
  setnewUserVisibale(newUserVisibale) {
    this.setState({ newUserVisibale });
  }

  setpermissionVisbale(permissionVisbale) {
    this.setState({ permissionVisbale });
  }
  render() {

    return (
      <PageHeaderLayout title="用户管理">
        <Modal
          title="添加用户"
          visible={this.state.newUserVisibale}
          onOk={() => this.setnewUserVisibale(false)}
          onCancel={() => { this.setnewUserVisibale(false) }}
        >
          <NewUser />
        </Modal>
        <Modal
          title="修改权限"
          visible={this.state.permissionVisbale}
          onOk={() => this.setpermissionVisbale(false)}
          onCancel={() => { this.setpermissionVisbale(false) }}
        >
          修改权限
        </Modal>
        <Card >
          <Button type="primary" style={{ margin: "8px 8px" }} onClick={() => this.setnewUserVisibale(true)}>添加用户</Button>
          <Button type="primary" style={{ margin: "8px 8px" }} onClick={() => this.setpermissionVisbale(true)}>修改权限</Button>
          <Table columns={columns} dataSource={data} />
        </Card>
      </PageHeaderLayout>
    )
  }
}
export default UserManager;
