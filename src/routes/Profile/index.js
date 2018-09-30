import React, { Fragment } from 'react';
import { Card, Icon, Tabs, Row, Col, Form, Input, Button, message, Alert } from "antd";
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
var md5 = require('md5');

const TabPane = Tabs.TabPane;
const { TextArea } = Input;

const DataTab = (props) => {
  var newDate = new Object()
  const data = props;
  const formChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    newDate[key] = value;
    console.log(newDate)
  }
  const submitData = () => {
    console.log(newDate);

  }

  return (
    <div style={{ margin: "0 auto", width: "400px", height: "200px" }} onChange={formChange}>
      <Row gutter={3} style={{ margin: "15px auto" }}>
        <Col span={7} style={{ textAlign: "end" }}>用户编号：</Col>
        <Col span={15}>{data.userID}</Col>
      </Row>
      <Row gutter={3} style={{ margin: "15px auto" }}>
        <Col span={7} style={{ textAlign: "end" }}>身份类型：</Col>
        <Col span={15}>{data.userType}</Col>
      </Row>
      <Row gutter={3} style={{ margin: "15px auto" }}>
        <Col span={7} style={{ textAlign: "end" }}>用户名：</Col>
        <Col span={15}><Input defaultValue={data.userName} name="userName" /></Col>
      </Row>
      <Row gutter={3} style={{ margin: "15px auto" }}>
        <Col span={7} style={{ textAlign: "end" }}>联系电话：</Col>
        <Col span={15}><Input defaultValue={data.tel} name="tel" /></Col>
      </Row>
      <Row gutter={3} style={{ margin: "15px auto" }}>
        <Col span={7} style={{ textAlign: "end" }}>Email：</Col>
        <Col span={15}><Input defaultValue={data.email} name="email" /></Col>
      </Row>
      <Row gutter={3} style={{ margin: "15px auto" }}>
        <Row gutter={3} style={{ margin: "15px auto" }}>
          <Col span={7} style={{ textAlign: "end" }}>备注：</Col>
          <Col span={15}><TextArea defaultValue={data.others} name="others" /></Col>
        </Row>
        <Col span={15} offset={22}><Button type="primary" onClick={submitData}>修改资料</Button></Col>
      </Row>
    </div>
  )

}
const PskTab = () => {
  var newPsk = new Object();
  const formChange = (e) => {

    const key = e.target.name;
    const value = md5(md5(e.target.value));
    newPsk[key] = value;
    console.log(newPsk)
  }
  const submitPsk = () => {
    if (newPsk.old === undefined) {
      message.warning('请输入原密码')
    }
    if (newPsk.new != newPsk.confirm) {
      message.warning('两次密码不一致请重新输入')

    }


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

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        userName: '153',
        userID: '213123321',
        userType: '管理员',
        tel: '18722333344',
        email: '112321@sina.com',
        others: '呗组湖北㕚'
      },
    };
  }
  handleChangeState = (fields, target) => {
  }

  render() {
    const data = this.state.data;
    return (
      <PageHeaderLayout title="用户资料">
        <Card >
          <Tabs defaultActiveKey="1">
            <TabPane tab={<span><Icon type="idcard" />个人资料</span>} key="1">
              <DataTab {...data} />
            </TabPane>
            <TabPane tab={<span><Icon type="key" />修改密码</span>} key="2">
              <PskTab />
            </TabPane>
          </Tabs>,
        </Card>
      </PageHeaderLayout>
    )
  }
}
export default Profile;
