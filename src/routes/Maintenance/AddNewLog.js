import React, { PureComponent, Fragment } from 'react';
import { Card, Checkbox, Row, Col, Divider, Input, Spin, DatePicker, Button, Modal, Cascader } from "antd";
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { connect } from 'dva';
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;
@connect(({ rule, chart }) => ({
  rule,
  chart
}))
class Maintetance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: [],
      people: '',
      date: '',
      content: '',
      location: ''

    };
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/fetchSiteListWithPosition',
    })
    dispatch({
      type: 'rule/fetchMaintenanceID',
    })
  }
  onResetHandle = () => {
    this.setState({
      type: [],
      people: '',
      date: '',
      content: '',
      location: ''
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
  onlocationChange = (e) => {
    const value = e[2]
    this.setState({
      location: value,
    })
  }
  submitHandle = () => {
    console.log(this.state)
    const confirmChange = () => {
      const { dispatch } = this.props;
      console.log(this.state)
      dispatch({
        type: 'rule/addMaintenanceLog',
        payload: this.state
      });
    }
    Modal.confirm({
      title: '添加日志',
      onOk: confirmChange,
      cancelText: '取消',
      okText: '确认',
      content: `确认添加日志吗？\n日志添加后不允许修改或者删除！`
    });
  }
  render() {
    const options = [
      { label: '并网问题', value: '0' },
      { label: '逆变器', value: '1' },
      { label: '光伏组件', value: '2' },
      { label: '站点环境', value: '3' },
      { label: '其他', value: '4' },
    ];
    const { chart, rule } = this.props;
    const { siteListWithPosition } = chart;
    const { maintenanceID } = rule;
    return (
      <PageHeaderLayout title="新建维保日志">
        {
          siteListWithPosition ?
            <Card style={{ width: "800px", margin: "0 auto" }}>
              <h1 style={{ textAlign: "center" }}>维保日志</h1>
              <span style={{ float: "right" }}>编号：{maintenanceID}</span>
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
                <Col span={19}> <Cascader options={siteListWithPosition} placeholder='请选择站点' style={{ marginRight: '8px', width: "250px" }} onChange={this.onlocationChange.bind(this)} /></Col>
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
            :
            <Spin
              tip=" 加载数据中"
              size="large"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", lineHeight: "calc(40vh)" }}
            />
        }
      </PageHeaderLayout>
    )
  }
}
export default Maintetance;
