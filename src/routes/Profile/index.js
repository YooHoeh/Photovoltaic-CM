import React, { Fragment } from 'react';
import { Card, Icon, Tabs, Row, Col, Form, Input, Button } from "antd";
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
var md5 = require('md5');

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const { TextArea } = Input;

const DataTab = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      username: Form.createFormField({
        ...props.username,
        value: props.username
      }),
    };
  },
  onValuesChange(_, values) {
    console.log(values);
  },
})((props) => {
  const { getFieldDecorator } = props.form;
  return (
    <Form layout="horizontal" style={{ margin: "0 auto", width: "800px" }}>
      <FormItem label="用户名" labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} >
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Username is required!' }],
        })(<Input />)}
      </FormItem>
      <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="联系电话">
        {getFieldDecorator('tel', {
          rules: [{ required: true, message: 'Username is required!' }],
        })(<Input />)}
      </FormItem>
      <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="电子邮件">
        {getFieldDecorator('email', {
          rules: [{ required: true, message: 'Username is required!' }],
        })(<Input />)}
      </FormItem>
      <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="备注 ">
        {getFieldDecorator('others', {
          rules: [{ required: true, message: 'Username is required!' }],
        })(<TextArea rows={4} />)}
      </FormItem>
    </Form>
  );
});
const PskTab = () => {
  const put = (e) => {
    console.log(md5(e.target.value))
  }
  return (
    <div style={{ margin: "0 auto", width: "400px", height: "200px" }}>
      <Row gutter={3} style={{ margin: "15px auto" }}>
        <Col span={7} style={{ textAlign: "end" }}>原始密码：</Col><Col span={15}><Input onChange={put} /></Col>
      </Row>
      <Row gutter={3} style={{ margin: "15px auto" }}>
        <Col span={7} style={{ textAlign: "end" }}>新密码:</Col><Col span={15}><Input onChange={put} /></Col>
      </Row>
      <Row gutter={3} style={{ margin: "15px auto" }}>
        <Col span={7} style={{ textAlign: "end" }}>确认密码:</Col><Col span={15}><Input onChange={put} /></Col>
      </Row>
      <Row gutter={3} style={{ margin: "15px auto" }}>
        <Col span={15}><Button type="primary">修改密码</Button></Col>
      </Row>



    </div>

  );
};

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        data: {
          username: '153',
          userID: '',
          userType: '',
          tel: '',
          email: '',
          others: ''
        },
        pass: {
          old: '',
          new: '',
          confirm: ''
        }
      }
    };
  }

  handleDataChange = (changedFields) => {
    this.setState(({ fields }) => ({
      data: { ...fields, ...changedFields },
    }));
  }
  render() {
    const fields = this.state.fields;
    return (
      <PageHeaderLayout title="用户资料">
        <Card >
          <Tabs defaultActiveKey="1">
            <TabPane tab={<span><Icon type="idcard" />个人资料</span>} key="1">
              <DataTab {...fields.data} onChange={this.handleDataChange} />
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
