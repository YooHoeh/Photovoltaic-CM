import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Card, Icon, Tabs, Row, Col, Form, Input, Button, message, Alert } from "antd";
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
var md5 = require('md5');

const TabPane = Tabs.TabPane;
const { TextArea } = Input;
const DataTab = (props) => {
  const { dispatch } = props;
  const data = props;
  var newDate = {
    email: data.email,
    phone: data.phone,
    username: data.username,
    remark: data.remark
  }
  const formChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    newDate[key] = value;
    console.log(newDate)
  }
  const submitData = () => {
    console.log(newDate);
    dispatch({
      type: 'user/UpdateUserProfile',
      payload: newDate
    })

  }
  const roleCodeToRoleName = (code) => {
    switch (code) {
      case 'admin': return '管理员'
      case 'su': return '超级管理员'
      case 'wb': return '维保人员'
      case 'wy': return '维运人员'
      case 'demo': return '演示人员'
    }
  }
  return (
    <div style={{ margin: "0 auto", width: "400px", height: "200px" }} onChange={formChange}>
      <Row gutter={3} style={{ margin: "15px auto" }}>
        <Col span={7} style={{ textAlign: "end" }}>用户编号：</Col>
        <Col span={15}>{data.id}</Col>
      </Row>
      <Row gutter={3} style={{ margin: "15px auto" }}>
        <Col span={7} style={{ textAlign: "end" }}>身份类型：</Col>
        <Col span={15}>{roleCodeToRoleName(data.role)}</Col>
      </Row>
      <Row gutter={3} style={{ margin: "15px auto" }}>
        <Col span={7} style={{ textAlign: "end" }}>用户名：</Col>
        <Col span={15}><Input defaultValue={data.username} name="username" /></Col>
      </Row>
      <Row gutter={3} style={{ margin: "15px auto" }}>
        <Col span={7} style={{ textAlign: "end" }}>联系电话：</Col>
        <Col span={15}><Input defaultValue={data.phone} name="phone" /></Col>
      </Row>
      <Row gutter={3} style={{ margin: "15px auto" }}>
        <Col span={7} style={{ textAlign: "end" }}>Email：</Col>
        <Col span={15}><Input defaultValue={data.email} name="email" /></Col>
      </Row>
      <Row gutter={3} style={{ margin: "15px auto" }}>
        <Row gutter={3} style={{ margin: "15px auto" }}>
          <Col span={7} style={{ textAlign: "end" }}>备注：</Col>
          <Col span={15}><TextArea defaultValue={data.remark} name="remark" /></Col>
        </Row>
        <Col span={15} offset={22}><Button type="primary" onClick={submitData}>修改资料</Button></Col>
      </Row>
    </div>
  )

}
const PskTab = (props) => {
  var newPsk = new Object();
  const dispatch = props.dispatch
  const formChange = (e) => {

    const key = e.target.name;
    const value = md5(md5(e.target.value));
    newPsk[key] = value;
    console.log(newPsk)
  }
  const submitPsk = () => {
    if (newPsk.old === undefined) {
      message.warning('请输入原密码')
      return;
    }
    if (newPsk.new != newPsk.confirm) {
      message.warning('两次密码不一致请重新输入')
      return;
    }
    dispatch({
      type: 'user/UpdateUserPsk',
      payload: {
        old: newPsk.old,
        new: newPsk.new
      }
    })


  }
  return (
    <div style={{ margin: "0 auto", width: "400px", height: "200px" }} onChange={formChange}>
      <Row gutter={3} style={{ margin: "15px auto" }}>
        <Col span={7} style={{ textAlign: "end" }}>原始密码：</Col>
        <Col span={15}><Input type="password" name="old" /></Col>
      </Row>
      <Row gutter={3} style={{ margin: "15px auto" }}>
        <Col span={7} style={{ textAlign: "end" }}>新密码：</Col>
        <Col span={15}><Input type="password" name="new" /></Col>
      </Row>
      <Row gutter={3} style={{ margin: "15px auto" }}>
        <Col span={7} style={{ textAlign: "end" }}>确认密码：</Col>
        <Col span={15}><Input type="password" name="confirm" /></Col>
      </Row>
      <Row gutter={3} style={{ margin: "15px auto" }}>
        <Col span={15} offset={22}><Button type="primary" onClick={submitPsk}>修改密码</Button></Col>
      </Row>
    </div>
  );
};
@connect(({ rule, loading, user }) => ({
  rule,
  user,
}))
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  handleChangeState = (fields, target) => {
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent'
    })
  }
  render() {
    const { user: { currentUser } } = this.props;
    return (
      <PageHeaderLayout title="用户资料">
        <Card >
          <Tabs defaultActiveKey="1">
            <TabPane tab={<span><Icon type="idcard" />个人资料</span>} key="1">
              <DataTab {...currentUser} dispatch={this.props.dispatch} />
            </TabPane>
            <TabPane tab={<span><Icon type="key" />修改密码</span>} key="2">
              <PskTab dispatch={this.props.dispatch} />
            </TabPane>
          </Tabs>,
        </Card>
      </PageHeaderLayout>
    )
  }
}
export default Profile;
