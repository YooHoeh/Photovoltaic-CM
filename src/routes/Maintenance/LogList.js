import React, { PureComponent, Fragment } from 'react';
import { Card, Checkbox, Row, Col, Divider, Input, DatePicker, Button } from "antd";
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;
class Maintetance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: [],
      people: '',
      date: '',
      logID: 'WB20180822-001',
      content: '',
      localtion: ''

    };
  }
  onResetHandle = () => {
    this.setState({
      type: [],
      people: '',
      date: '',
      content: '',
      localtion: ''
    })
  }
  onDateChange = (date, dateString) => {
    this.setState({ date: dateString })
    console.log(dateString);
  }
  onCheckChange = (checkedValues) => {
    this.setState({
      type: checkedValues,
    })
    console.log(checkedValues)
  }
  onTextAreaChange = (e) => {
    const { value } = e.target;
    this.setState({
      content: value,
    })
    console.log(value)
  }
  onPeopleChange = (e) => {
    const { value } = e.target;
    this.setState({
      people: value,
    })
    console.log(value)
    console.log("123")
  }
  onLocaltionChange = (e) => {
    const { value } = e.target;
    console.log(value)
    this.setState({
      localtion: value,
    })
  }
  submitHandle = () => {
    console.log(this.state)
  }
  render() {
    const options = [
      { label: '并网问题', value: '0' },
      { label: '逆变器', value: '1' },
      { label: '光伏组件', value: '2' },
      { label: '站点环境', value: '3' },
      { label: '其他', value: '4' },
    ];
    return (
      <PageHeaderLayout title="维保日志">
        <Card style={{ width: "800px",margin:"0 auto" }}>
          <h1 style={{ textAlign: "center" }}>维保日志</h1>
          <span style={{ float: "right" }}>编号：{this.state.logID}</span>
          <Divider />
          <Row>
            <Col span={3}>
              负责人员：
            </Col>
            <Col span={6}>
              <Input onChange={this.onPeopleChange} value={this.state.people} />
            </Col>
            <Col span={3} offset={4}>
              维保时间：
            </Col>
            <Col span={6}>
              <DatePicker onChange={this.onDateChange} />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={3}>维保站点：</Col>
            <Col span={19}><Input onChange={this.onLocaltionChange} value={this.state.localtion} /></Col>
          </Row>
          <Divider />
          <Row>
            <Col span={3}>
              维保类型:
            </Col>
            <Col >
              <CheckboxGroup options={options} onChange={this.onCheckChange} value={this.state.type} />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={3} >
              维保内容:
            </Col>
            <Col span={19}>
              <TextArea rows={20} onChange={this.onTextAreaChange} value={this.state.content} />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={3} offset={17}>
              <Button onClick={this.onResetHandle} >重置</Button>
            </Col>
            <Col span={3}>
              <Button type="primary" onClick={this.submitHandle}>确认</Button>
            </Col>
          </Row>
        </Card>
      </PageHeaderLayout>
    )
  }
}
export default Maintetance;
