import React, { PureComponent, Fragment } from 'react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  Radio,
  message,
  Badge,
  Divider,
  TreeSelect,
  Table,
} from 'antd';
const FormItem = Form.Item;
const CustomizedForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      username: Form.createFormField({
        ...props.username,
        value: props.username.value,
      }),

    };
  },
  onValuesChange(_, values) {
    console.log(123);
  },
})((props) => {
  const { getFieldDecorator } = props.form;
  const Inputt = () => {
    return <Input style={{ border: "none", borderBottom: "1px solid #999" }} />
  }
  return (
    <Form layout="inline" style={{ width: "800px", border: "3px solid #999", margin: "0 auto", padding: "15px" }}>
      <Row>
        <h1 style={{ textAlign: "center" }}>光伏维保日志</h1>
      </Row>
      <Row>
        <Col xl={12} md={24}>
          <FormItem label="维保负责人">
            {getFieldDecorator('people', {
              rules: [{ required: true, message: '填写维保负责人!' }],
            })(<Inputt />)}
          </FormItem>
        </Col>
        <Col xl={12} md={24}>
          <FormItem label="维保时间">
            {getFieldDecorator('date', {
              rules: [{ required: true, message: '填写维保时间!' }],
            })(<DatePicker />)}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <FormItem label="维保站点">
          {getFieldDecorator('people', {
            rules: [{ required: true, message: '填写维保负责人!' }],
          })(<Inputt />)}
        </FormItem>
      </Row>
      <Row>
        <Col >
          <FormItem label="日志编号"> {getFieldDecorator('logID', {})(<Input defaultValue="123" disabled />)}
          </FormItem>

        </Col>
      </Row>
    </Form>
  );
});
class AddLog extends React.Component {
  state = {
    fields: {
      username: {
        value: '',
      },
    },
  };

  handleFormChange = (changedFields) => {
    this.setState(({ fields }) => ({
      fields: { ...fields, ...changedFields },
    }));
  }
  render() {
    const fields = this.state.fields;
    return (
      <PageHeaderLayout title="新建维保日志">
        <Card
          bordered={false}
        >
          <CustomizedForm {...fields} onChange={this.handleFormChange} />
        </Card>
      </PageHeaderLayout>
    )
  }
}
export default AddLog;