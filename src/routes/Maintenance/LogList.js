import React, { PureComponent, Fragment } from 'react';
import { Card, Checkbox, Row, Col, Divider, Input, DatePicker, Button, Table, Tag } from "antd";
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;
const { RangePicker } = DatePicker;
const columns = [{
  title: '维保负责人',
  dataIndex: 'name',
  sorter: (a, b) => a.name.length - b.name.length,
}, {
  title: '维保站点',
  dataIndex: 'localtion',
  sorter: (a, b) => a.localtion.length - b.localtion.length,
}, {
  title: '维保类型',
  dataIndex: 'type',
  filters: [{
    text: '并网问题',
    value: 0,
  }, {
    text: '逆变器',
    value: 1,
  }, {
    text: '光伏组件',
    value: 2,
  }, {
    text: '站点环境',
    value: 3,
  }, {
    text: '其他',
    value: 4,
  }],
  filterMultiple: true,
  onFilter: (value, record) => record.type.map(item => (item === value)),
  sorter: (a, b) => a.type.length - b.type.length,
  render: type => (
    <span>
      {type.map(item => {
        switch (item) {
          case 0:
            return <Tag color="#2db7f5">并网问题</Tag>;
          case 1:
            return <Tag color="#2db7f5">逆变器</Tag>;
          case 2:
            return <Tag color="#2db7f5">光伏组件</Tag>;
          case 3:
            return <Tag color="#2db7f5">站点环境</Tag>;
          case 4:
            return <Tag color="#2db7f5">其他</Tag>;
          default: break;
        }
      })}
    </span>
  ),
}, {
  title: "维保时间",
  dataIndex: "time",
  sorter: (a, b) => a.time.length - b.time.length,

}];

const data = [{
  key: '1',
  name: '雷军',
  localtion: "伏站点",
  type: [0, 2, 3],
  time: "1018-12-01"
}, {
  key: '2',
  name: '罗永浩',
  localtion: "光伏站点",
  type: [0, 3],
  time: "2018-09-03"

}, {
  key: '4',
  name: '柳传志',
  localtion: "某光站点",
  type: [0],
  time: "2018-09-02"
}, {
  key: '5',
  name: '马化腾',
  localtion: "某光伏点",
  type: [1, 4],
  time: "2018-09-01"

}, {
  key: '6',
  name: '罗永浩',
  localtion: "某点",
  type: [0, 1, 2, 3, 4],
  time: "2018-09-01"

}, {
  key: '7',
  name: '雷军',
  localtion: "某光伏站点",
  type: [2, 3],
  time: "2017-09-01"
}];
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
  onDateRangeChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }
  onTableChange = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
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
        {/* <Card style={{ width: "800px",margin:"0 auto" }}>
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
        </Card> */}
        <Card
          title="维保日志列表"
          extra={<RangePicker onChange={this.onDateRangeChange} />}
        >

          <Table columns={columns} dataSource={data} onChange={this.onTableChange} />
        </Card>
      </PageHeaderLayout>
    )
  }
}
export default Maintetance;
