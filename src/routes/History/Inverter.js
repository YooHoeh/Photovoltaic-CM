import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
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
  Tooltip,
  Badge,
  Divider,
  TreeSelect,
  Table,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Basiccolumn from "../../components/Basiccolumn";
import styles from './Inverter.less';
const { RangePicker, MonthPicker } = DatePicker;
const Option = Select.Option;
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  filters: [{
    text: 'Joe',
    value: 'Joe',
  }, {
    text: 'Jim',
    value: 'Jim',
  }, {
    text: 'Submenu',
    value: 'Submenu',
    children: [{
      text: 'Green',
      value: 'Green',
    }, {
      text: 'Black',
      value: 'Black',
    }],
  }],
  // specify the condition of filtering result
  // here is that finding the name started with `value`
  onFilter: (value, record) => record.name.indexOf(value) === 0,
  sorter: (a, b) => a.name.length - b.name.length,
}, {
  title: '逆变器编号',
  dataIndex: 'age',
  defaultSortOrder: 'descend',
  sorter: (a, b) => a.age - b.age,
}, {
  title: 'Address',
  dataIndex: 'address',
  filters: [{
    text: 'London',
    value: 'London',
  }, {
    text: 'New York',
    value: 'New York',
  }],
  filterMultiple: false,
  onFilter: (value, record) => record.address.indexOf(value) === 0,
  sorter: (a, b) => a.address.length - b.address.length,
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '4',
  name: 'Jim Red',
  age: 32,
  address: 'London No. 2 Lake Park',
}];
const inverter = {
  site: "光伏电站001",
  id: "410001A001011001",
  model: "某型号",
  serial: "某串号",
  agreement: "三相协议",
  mpptNum: "12",
  pvNum: "4",
  runState: "待机",
  date: " Sep 13 2018 09:11:36",
  totalPower: "2000kW"
}
const inverterInfo = (

  <div>
    <Row type="flex" justify="space-around" align="middle">
      <Col span={10}>编号:</Col>
      <Col span={13} style={{ margin: "3px" }}>{inverter.id}</Col>
    </Row>
    <Row type="flex" justify="space-around" align="middle">
      <Col span={10}>所属站点:</Col>
      <Col span={13} style={{ margin: "3px" }}>{inverter.site}</Col>
    </Row>
    <Row type="flex" justify="space-around" align="middle">
      <Col span={10}>机器型号:</Col>
      <Col span={13} style={{ margin: "3px" }}>{inverter.model}</Col>
    </Row>
    <Row type="flex" justify="space-around" align="middle">
      <Col span={10}>机器串号:</Col>
      <Col span={13} style={{ margin: "3px" }}>{inverter.serial}</Col>
    </Row>
    <Row type="flex" justify="space-around" align="middle">
      <Col span={10}>协议类型:</Col>
      <Col span={13} style={{ margin: "3px" }}>{inverter.agreement}</Col>
    </Row>
    <Row type="flex" justify="space-around" align="middle">
      <Col span={10}>光伏组串总数:</Col>
      <Col span={13} style={{ margin: "3px" }}>{inverter.mpptNum}</Col>
    </Row>
    <Row type="flex" justify="space-around" align="middle">
      <Col span={10}>光伏支路总数:</Col>
      <Col span={13} style={{ margin: "3px" }}>{inverter.pvNum}</Col>
    </Row>
    <Row type="flex" justify="space-around" align="middle">
      <Col span={10}>总光伏发电量:</Col>
      <Col span={13} style={{ margin: "3px" }}>{inverter.totalPower}</Col>
    </Row>
    <Row type="flex" justify="space-around" align="middle">
      <Col span={10}>运行状态状态:</Col>
      <Col span={13} style={{ margin: "3px" }}>{inverter.runState}</Col>
    </Row>
    <Row type="flex" justify="space-around" align="middle">
      <Col span={10}>更新时间:</Col>
      <Col span={13} style={{ margin: "3px" }}>{inverter.date}</Col>
    </Row>
  </div>
)

const getYear = () => {
  const thisYear = new Date().getFullYear();
  const year = []
  for (let i = 2017; i <= thisYear; i++) {
    year.push(< Option value={i} >{i}</Option >)
    console.log(i)
  }
  return year.map(item => item)
}

@connect(({ rule, loading }) => ({
  rule,
}))
export default class SiteHis extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data,
      filter: {
        interverID: "123",
        type: 'day',
        time: '1919-19-13'
      }
    };
    this.onDateChange = this.onDateChange.bind(this)
  }
  handleSearch() {
    console.log(this.state.filter)
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/fetchHistorySiteSearchData',
      fileter: this.state.filter
    });
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetch',
    });
  }
  timeSelector = () => {
    const type = this.state.filter.type;
    return (
      type == 'day' ?
        <DatePicker onChange={this.onDateChange} placeholder="单日查询" style={{ marginRight: "8px" }} />
        : type == 'month' ?
          <MonthPicker onChange={this.onMonthChange.bind(this)} placeholder="整月查询" style={{ marginRight: "8px" }} />
          : <Select onSelect={this.onYearChange.bind(this)} style={{ width: "180px" }} placeholder="全年查询">{getYear()}</Select>
    )
  }
  onChange(pagination, filters, sorter) {
    console.log('table', pagination, filters, sorter);
  }
  onDateChange(obj, date) {
    console.log('date', date);
    this.setState({
      filter: {
        type: 'day',
        time: date
      }
    },()=> this.handleSearch())
  }
  onMonthChange(obj, month) {
    console.log('month', month);
    this.setState({
      filter: {
        type: 'month',
        time: month
      }
    }, ()=>this.handleSearch())
  }
  onYearChange(year) {
    console.log('Year', year);
    this.setState({
      filter: {
        type: 'year',
        time: year
      }
    }, ()=>this.handleSearch())
  }
  timeSelectorChange(value) {
    this.setState({
      filter: {
        type: value
      }
    })
  }
  render() {
    return (
      <PageHeaderLayout title="逆变器查询">
        <Row >
          <Card
            bordered={false}
            title={<Tooltip placement="bottomLeft" title={inverterInfo}>{inverter.id + "逆变器发电量"}</Tooltip>}
            style={{ marginBottom: "12px" }}
            extra={<span>
              <Select defaultValue='day' onChange={this.timeSelectorChange.bind(this)} style={{ marginRight: "15px" }}> 
                <Option value='day'>单日查询</Option>
                <Option value='month'>整月查询</Option>
                <Option value='year'>全年查询</Option>
              </Select>
              {this.timeSelector()}
            </span>
            }
          >
          {

            <Basiccolumn />
          }
          </Card>
        </Row>
        <Row>
          <Col>
            <Card
              bordered={false}
              title="逆变器发电量碳补偿量"
              bodyStyle={{ height: 800 }}
              style={{ paddingLeft: "4px" }}

            >
              <Table columns={columns} dataSource={data} onChange={this.onChange} height={800} />
            </Card>
          </Col>
        </Row>

      </PageHeaderLayout>
    )
  }
}
