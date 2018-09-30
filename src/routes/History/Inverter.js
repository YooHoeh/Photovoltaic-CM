import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Select,
  DatePicker,
  Tooltip,
  Spin,
  Cascader,
  Table,
  Alert,
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
    const { chart } = this.props;
    const { historyInverterSearchData } = chart;
    this.state = {
      filter: {
        interverID: "123",
        type: 'day',
        time: '1919-19-13'
      },
      data: historyInverterSearchData.data,
      info: historyInverterSearchData.info,
    };
    this.onDateChange = this.onDateChange.bind(this)
  }
  handleSearch() {
    console.log(this.state.filter)
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/fetchHistoryInverterSearchData',
      fileter: this.state.filter
    });
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/fetchInverterListWithPosition',
    });
    dispatch({
      type: 'chart/fetchHistoryInverterSearchData',
      fileter: this.state.filter
    });
  }
  timeSelector = () => {
    const type = this.state.filter.type;
    return (
      (type == 'day' || type == '') ?
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
    this.setState((preState, props) => ({
      filter: {
        type: 'day',
        time: date,
        inverterID: preState.filter.inverterID,
      }
    }), () => this.handleSearch())
  }
  onMonthChange(obj, month) {
    this.setState((preState, ) => ({
      filter: {
        type: 'month',
        time: month,
        inverterID: preState.filter.inverterID,
      }
    }), () => this.handleSearch())
  }
  onYearChange(year) {
    this.setState((preState, props) => ({
      filter: {
        type: 'year',
        time: year,
        inverterID: preState.filter.inverterID,
      }
    }), () => this.handleSearch())
  }
  timeSelectorChange(value) {
    this.setState((preState) => ({
      filter: {
        type: value,
        time: preState.filter.time,
        inverterID: preState.filter.inverterID,
      }
    }))
  }
  inverterChange(value) {
    console.log(value[3])
    this.setState((preState) => ({
      filter: {
        type: preState.filter.type,
        time: preState.filter.time,
        inverterID: value[3],
      }
    }), () => this.handleSearch())
  }
  render() {

    const inverterInfo = () => {
      const inverter = this.state.info;
      return (

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
    }
    const columns = [{
      title: '时间',
      dataIndex: 'time',
      sorter: (a, b) => a.time - b.time,
      defaultSortOrder: 'descend',
    }, {
      title: '发电量',
      dataIndex: 'value',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.value - b.value,
    },
    ];
    const { chart } = this.props;
    const { inverterListWithPosition } = chart;
    return (
      <PageHeaderLayout title="逆变器查询">
        {
          inverterListWithPosition ?
            <Row>
              <Card
                bordered={false}
                title={<Tooltip placement="bottomLeft" title={this.state.info ? inverterInfo : '请选择站点'}>{this.state.info ? (this.state.info.id + "逆变器发电量") : '请选择逆变器'}</Tooltip>}
                style={{ marginBottom: "12px" }}
                extra={<span>
                  <Cascader options={inverterListWithPosition} placeholder='请选择逆变器' style={{ marginRight: '8px' }} onChage={this.inverterChange.bind(this)} />
                  <Select defaultValue='day' onChange={this.timeSelectorChange.bind(this)} style={{ marginRight: "15px" }}>
                    <Option value='day'>单日查询</Option>
                    <Option value='month'>整月查询</Option>
                    <Option value='year'>全年查询</Option>
                  </Select>
                  {this.timeSelector()}
                </span>
                }>
                {
                  this.state.data ?
                    <Basiccolumn
                      data={this.state.data}
                    />
                    : <Alert
                      message="请选择逆变器"
                      description="选择逆变器后，选择要查询的时间查看发电量柱状分析图"
                      type="info"
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
              <Table columns={columns} dataSource={this.state.data} onChange={this.onChange} height={800} />
            </Card>
          </Col>
        </Row>
      </PageHeaderLayout>
    )
  }
}