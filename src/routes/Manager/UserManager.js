import React, { PureComponent, Fragment } from 'react';
import { Card, Button, Form, Input, Select, Tree, Transfer, Modal, Table, Divider, Tag, Radio } from 'antd'
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import TextArea from 'antd/lib/input/TextArea';
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
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
        <Modal
          title="添加用户"
          visible={visible}
          onOk={onCreate}
          onCancel={onCancel}
        >
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
                  <Radio value="admin">管理员</Radio>
                  <Radio value="VT">维运人员</Radio>
                  <Radio value="VP">维保人员</Radio>
                  <Radio value="demo">演示</Radio>
                </Radio.Group>
              )}
            </FormItem>
            <FormItem label="联系方式">
              {getFieldDecorator('tel', {
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="Email">
              {getFieldDecorator('email', {
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="备注">
              {getFieldDecorator('others', {
              })(
                <TextArea />
              )}
            </FormItem>
          </Form >
        </Modal>
      )
    }
  })
const PermissonEdit = Form.create()(
  class extends React.Component {
    onCheck = (checkedKeys) => {
      this.props.patchMenuInfo(checkedKeys);
    };
    renderTreeNodes = (data, key = '') => {
      return data.map((item) => {
        let parentKey = key + item.key;
        if (item.children) {
          return (
            <TreeNode title={item.title} key={parentKey} dataRef={item}>
              {this.renderTreeNodes(item.children, parentKey)}
            </TreeNode>
          );
        } else if (item.btnList) {
          return (
            <TreeNode title={item.title} key={parentKey} dataRef={item}>
              {this.renderBtnTreedNode(item, parentKey)}
            </TreeNode>
          );
        }
        return <TreeNode {...item} />;
      });
    };
    renderBtnTreedNode = (menu, parentKey = '') => {
      const btnTreeNode = []
      menu.btnList.forEach((item) => {
        console.log(parentKey + '-btn-' + item.key);
        btnTreeNode.push(<TreeNode title={item.title} key={parentKey + '-btn-' + item.key} />);
      })
      return btnTreeNode;
    }
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          title="修改权限"
          visible={visible}
          onOk={onCreate}
          onCancel={onCancel}
        >
          <Form>
            <Tree
              checkable
              defaultExpandAll
              onCheck={(checkedKeys) => this.onCheck(checkedKeys)}
              checkedKeys={menuInfo || []}
            >
              <TreeNode title="平台权限" key="platform_all">
                {this.renderTreeNodes(menuConfig)}
              </TreeNode>
            </Tree>
          </Form>
        </Modal>
      )
    }
  }
)

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
  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }
  handleNewUserCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      form.resetFields();
      this.setnewUserVisibale(false)

    });
  }
  handlePermissionCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setpermissionVisbale(false)


    });
  }
  render() {

    return (
      <PageHeaderLayout title="用户管理">

        <NewUser
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.newUserVisibale}
          onCancel={() => { this.setnewUserVisibale(false) }}
          onCreate={this.handleNewUserCreate}
        />

        <PermissonEdit
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.permissionVisbale}
          onCancel={() => { this.setpermissionVisbale(false) }}
          onCreate={this.handlePermissionCreate}
        />

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
