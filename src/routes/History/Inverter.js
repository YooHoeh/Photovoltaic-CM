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
  Spin,
  Badge,
  Cascader,
  Divider,
  TreeSelect,
  Table,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Basiccolumn from "../../components/Basiccolumn";
const { MonthPicker } = DatePicker;
const Option = Select.Option;



const getYear = () => {
  const thisYear = new Date().getFullYear();
  const year = []
  for (let i = 2017; i <= thisYear; i++) {
    year.push(< Option value={i} >{i}</Option >)
  }
  return year.map(item => item)
}

@connect(({ rule, chart = {} }) => ({
  rule,
  chart,
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
    dispatch({
      type: 'chart/fetchHistoryInverterSearchData',
      fileter: this.state.filter
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
    }, () => this.handleSearch())
  }
  onMonthChange(obj, month) {
    console.log('month', month);
    this.setState({
      filter: {
        type: 'month',
        time: month
      }
    }, () => this.handleSearch())
  }
  onYearChange(year) {
    console.log('Year', year);
    this.setState({
      filter: {
        type: 'year',
        time: year
      }
    }, () => this.handleSearch())
  }
  timeSelectorChange(value) {
    this.setState({
      filter: {
        type: value
      }
    })
  }
  inverterChange(value) {
    this.setState({
      filter: {
        inverterID: value,
      }
    })
  }
  render() {
    const inverterList = [];
    const { chart } = this.props;
    const { historyInverterSearchData } = chart;
    const inverter = historyInverterSearchData.info;
    const data = historyInverterSearchData.data;
    const inverterInfo = (
      inverter ?
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
        :
        <Spin
          tip="等待数据"
          size="middle"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", lineHeight: "calc(40vh)" }}
        />
    )
    const columns = [{
      title: '时间',
      dataIndex: 'time',
      sorter: (a, b) => a.time - b.time,
      defaultSortOrder: 'descend',
      render: value => `${value}年`
    }, {
      title: '发电量',
      dataIndex: 'value',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.value - b.value,
    },
    ];

    return (
      <PageHeaderLayout title="逆变器查询">
        {
          inverter ?
            <Row>
              <Card
                bordered={false}
                title={<Tooltip placement="bottomLeft" title={inverterInfo}>{inverter.id + "逆变器发电量"}</Tooltip>}
                style={{ marginBottom: "12px" }}
                extra={<span>
                  <Cascader options={inverterList} placeholder='请选择逆变器' style={{ marginRight: '8px' }} onChage={this.inverterChange.bind(this)} />
                  <Select defaultValue='day' onChange={this.timeSelectorChange.bind(this)} style={{ marginRight: "15px" }}>
                    <Option value='day'>单日查询</Option>
                    <Option value='month'>整月查询</Option>
                    <Option value='year'>全年查询</Option>
                  </Select>
                  {this.timeSelector()}
                </span>
                }>
                {
                  data ?
                    <Basiccolumn
                      data={data}
                    />
                    : <Spin
                      tip="等待数据"
                      size="middle"
                      style={{ display: "flex", alignItems: "center", justifyContent: "center", lineHeight: "calc(40vh)" }}
                    />
                }
              </Card>
            </Row>
            : <Spin
              tip="等待数据"
              size="middle"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", lineHeight: "calc(40vh)" }}
            />}
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