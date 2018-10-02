import React from 'react';
import { Card, Button, Form, TreeSelect, Input, Select, Tree, Modal, Table, Divider, Radio } from 'antd'
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import TextArea from 'antd/lib/input/TextArea';
import { connect } from "dva";
import { menuData } from "../../common/menu";
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
const FormItem = Form.Item;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;


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
          <Form layout="horizontal">
            <FormItem label="用户名">
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入用户名' }],
              })(
                <Input />
              )}
            </FormItem>

            <FormItem label="账户类型">
              {getFieldDecorator('role', {
                initialValue: 'admin',
                rules: [{ required: true, message: '必须选择用户类型' }],
              })(
                <Radio.Group>
                  <Radio value="admin">管理员</Radio>
                  <Radio value="wy">维运人员</Radio>
                  <Radio value="wb">维保人员</Radio>
                  <Radio value="demo">演示</Radio>
                </Radio.Group>
              )}
            </FormItem>
            <FormItem label="联系方式">
              {getFieldDecorator('phone', {
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="Email">
              {getFieldDecorator('email', {
                rules: [{ type: 'email', message: '邮箱格式不正确' }]
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="备注">
              {getFieldDecorator('remark', {
              })(
                <TextArea />
              )}
            </FormItem>
          </Form >
        </Modal>
      )
    }
  })

const PermissonEdit = Form.create(
)(
  class extends React.Component {
    state = {
      expandedKeys: [],
      autoExpandParent: true,
      defaultValue: [],
      userSelect: 'admin'
    }
    //将permissionID转为位置标记
    permissionIDToindex = (id) => {
      const permissionList = ["0-0", "0-1", "0-2", "0-3", "0-3-0", "0-3-1", "0-3-1", "0-3-2", "0-4", "0-4-0", "0-4-1", "0-5", "0-5-0", "0-5-1", "0-6", "0-6-0", "0-6-1", "0-7"];
      return permissionList[id];
    }


    renderTreeNodes = (data) => {
      return data.map((item) => {
        if (item.children) {
          return (
            <TreeNode title={item.name} key={item.key} value={item.id}>
              {this.renderTreeNodes(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode title={item.name} key={item.key} value={item.id} />;
      });
    }
    userSelectChange = (value) => {
      console.log(`selected ${value}`);
      this.setState({ userSelect: value })
      switch (value) {
        case "admin":
          console.log('将权限列表勾选切换为管理员');
          break;
        case "wy":
          console.log('将权限列表勾选切换为维运人员');
          break;
        case "wb":
          console.log('将权限列表勾选切换为维保人员');
          break;
        case "3":
          console.log('将权限列表勾选切换为演示');
          break;
        default: break;

      }
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
          <FormItem label="角色类型">
            {getFieldDecorator('role', {
              initialValue: "admin"
            })(
              <Select style={{ width: 120 }} onChange={this.userSelectChange}>
                <Option value="admin">管理员</Option>
                <Option value="wy">维运人员</Option>
                <Option value="wb" >维保人员</Option>
                <Option value="demo">演示</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="平台权限">
            {getFieldDecorator('permissionList', {
            })(
              <TreeSelect
                defaultValue={this.state.defaultValue}
                treeCheckable={true}
                showCheckedStrategy={SHOW_PARENT}
                treeDefaultExpandAll={true}
                searchPlaceholder='选择权限'
                style={{
                  width: "300px"
                }}
              >
                {this.renderTreeNodes(menuData)}
              </TreeSelect>
            )}
          </FormItem>

        </Modal >
      )
    }
  }
)
@connect(({ rule, user, loading }) => ({
  rule,
  user,
  isUpdate: loading.effects['user/fetchUserList']
}))
class UserManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newUserVisibale: false,
      permissionVisbale: false,
      isUpdate: this.props.isUpdate
    };
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetchUserList'
    })

  }
  componentWillReceiveProps() {
    if (this.state.isUpdate) {

      const { dispatch } = this.props;
      dispatch({
        type: 'rule/fetchUserList'
      })
    }

  }
  setnewUserVisibale(newUserVisibale) {
    this.setState({ newUserVisibale });
  }

  setpermissionVisbale(permissionVisbale) {
    this.setState({ permissionVisbale });
  }
  saveFormRef1 = (formRef) => {
    this.formRef1 = formRef;
  }
  saveFormRef2 = (formRef) => {
    this.formRef2 = formRef;
  }
  handleNewUserCreate = () => {
    const form = this.formRef1.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      const { dispatch } = this.props;
      dispatch({
        type: 'user/addUser',
        payload: values
      })
      dispatch({
        type: 'rule/fetchUserList'
      })

      form.resetFields();
      this.setnewUserVisibale(false)

    });
  }
  handlePermissionCreate = () => {
    const form = this.formRef2.props.form;
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
    const { rule: { userList } } = this.props
    const columns = [
      {
        title: '用户编号',
        dataIndex: 'id',
        key: 'id',
        defaultSortOrder: 'descend',
        sorter: (a, b) => b.id - a.id,
      },
      {
        title: '角色类型',
        dataIndex: 'role',
        key: 'role',
        filters: [
          { text: '超级管理员', value: 'su' },
          { text: '管理员', value: 'admin' },
          { text: '维运人员', value: 'wy' },
          { text: '维保人员', value: 'wb' },
          { text: '演示', value: 'demo' },
        ],
        sorter: (a, b) => parseInt(a.role) - parseInt(b.role),
        render: (text, recode) => {
          switch (recode.role) {
            case 'su':
              return <span>超级管理员</span>;
            case 'admin':
              return <span>管理员</span>;
            case 'wy':
              return <span>维运人员</span>;
            case 'wb':
              return <span>维保人员</span>;
            case 'demo':
              return <span>演示</span>;
          }
        },
        onFilter: (value, record) => record.role === value,
      }, {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
      }, {
        title: '联系电话',
        dataIndex: 'phone',
        key: 'phone',
      }, {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
      }, {
        title: '管理权限',
        key: 'action',
        align: 'right',
        render: (text, record) => (
          record.role == 'su' ? <span>无法被修改</span> :
            <span>
              <a href="javascript:;" name={record.id} type={record.type} onClick={editUserClickHandle}>修改角色</a>
              <Divider type='vertical' />
              <a href="javascript:;" name={record.id} onClick={delUserClickHandle}>删除用户</a>
            </span>
        ),
      }];
    const editUserClickHandle = (e) => {
      const name = e.target.name;
      const userType = e.target.type;

      let newType = '';
      const userSelectChange = (value) => {
        newType = value;
      }
      const confirmChange = () => {
        console.log(newType)
        console.log(name)
        const { dispatch } = this.props;
        dispatch({
          type: 'user/UpdateUserRole',
          payload: {
            id: name,
            cid: newType
          }
        })
        dispatch({
          type: 'rule/fetchUserList'
        })
      }
      Modal.confirm({
        title: '修改角色身份',
        onOk: confirmChange,
        cancelText: '取消',
        okText: '确认修改',
        content: <Select style={{ width: 120 }} onChange={userSelectChange} defaultValue={userType}>
          <Option value="admin">管理员</Option>
          <Option value="wy">维运人员</Option>
          <Option value="wb" >维保人员</Option>
          <Option value="demo">演示</Option>
        </Select>,
      });

    }
    const delUserClickHandle = (e) => {
      const name = e.target.name
      const confirmChange = () => {
        console.log(name)
        const { dispatch } = this.props;
        dispatch({
          type: 'user/delUser',
          payload: {
            id: name
          }
        })
        dispatch({
          type: 'rule/fetchUserList'
        })
      }
      Modal.confirm({
        title: '删除角色',
        onOk: confirmChange,
        cancelText: '取消',
        okText: '确认',
        content: `确认删除用户：${name}  吗？此操作无法撤销！`
      });

    }
    return (
      <PageHeaderLayout title="用户管理">

        <NewUser
          wrappedComponentRef={this.saveFormRef1}
          visible={this.state.newUserVisibale}
          onCancel={() => { this.setnewUserVisibale(false) }}
          onCreate={this.handleNewUserCreate}
        />

        <PermissonEdit
          wrappedComponentRef={this.saveFormRef2}
          visible={this.state.permissionVisbale}
          onCancel={() => { this.setpermissionVisbale(false) }}
          onCreate={this.handlePermissionCreate}
          menuInfo={this.state.menuInfo || []}
          patchMenuInfo={(checkedKeys) => {
            this.setState({
              menuInfo: checkedKeys
            });
          }}
        />

        <Card >
          <Button type="primary" style={{ margin: "8px 8px" }} onClick={() => this.setnewUserVisibale(true)}>添加用户</Button>
          <Button style={{ margin: "8px 8px" }} onClick={() => this.setpermissionVisbale(true)}>修改权限</Button>
          <Table columns={columns} dataSource={userList} />
        </Card>
      </PageHeaderLayout>
    )
  }
}
export default UserManager;
