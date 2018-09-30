import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Select,
  DatePicker,
  Alert,
  Cascader,
  Spin,
  Table,
  Tooltip,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Stacked from "../../components/StackMap";
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
    const { historySiteSearchData } = chart;
    this.state = {
      filter: {
        siteID: "",
        type: '',
        time: ''
      },
      data: historySiteSearchData.data,
      info: historySiteSearchData.info,
    };
    this.onDateChange = this.onDateChange.bind(this)
  }
  handleSearch() {
    console.log(this.state)
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/fetchHistorySiteSearchData',
      fileter: this.state.filter
    });
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/fetchSiteListWithPosition',
    });
    dispatch({
      type: 'chart/fetchHistorySiteSearchData',
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
        siteID: preState.filter.siteID,
      }
    }), () => this.handleSearch())
  }
  onMonthChange(obj, month) {
    this.setState((preState, ) => ({
      filter: {
        type: 'month',
        time: month,
        siteID: preState.filter.siteID,
      }
    }), () => this.handleSearch())
  }
  onYearChange(year) {
    this.setState((preState, props) => ({
      filter: {
        type: 'year',
        time: year,
        siteID: preState.filter.siteID,
      }
    }), () => this.handleSearch())
  }
  timeSelectorChange(value) {
    this.setState((preState) => ({
      filter: {
        type: value,
        time: preState.filter.time,
        siteID: preState.filter.siteID,
      }
    }))
  }
  siteChange(value) {
    console.log(value[2])
    this.setState((preState) => ({
      filter: {
        type: preState.filter.type,
        time: preState.filter.time,
        siteID: value[2],
      }
    }), () => this.handleSearch())
  }
  render() {

    const siteInfo = () => {
      const info = this.state.info;
      return (
        info ?
          < div >
            <Row type="flex" justify="space-around" align="middle">
              <Col span={7}>名称:</Col><Col span={14} style={{ margin: "3px" }}>{info.name}</Col>
            </Row>
            <Row type="flex" justify="space-around" align="middle">
              <Col span={7}>位置:</Col><Col span={14} style={{ margin: "3px" }}>{info.position}</Col>
            </Row>
            <Row type="flex" justify="space-around" align="middle">
              <Col span={7}>坐标:</Col><Col span={14} style={{ margin: "3px" }}>{info.coordinate}</Col>
            </Row>
            <Row type="flex" justify="space-around" align="middle">
              <Col span={7}>设计容量:</Col><Col span={14} style={{ margin: "3px" }}>{info.disignCount}</Col>
            </Row>
            <Row type="flex" justify="space-around" align="middle">
              <Col span={7}>建设容量:</Col><Col span={14} style={{ margin: "3px" }}>{info.buildCount}</Col>
            </Row>
            <Row type="flex" justify="space-around" align="middle">
              <Col span={7}>占用面积:</Col><Col span={14} style={{ margin: "3px" }}>{info.area}</Col>
            </Row>
            <Row type="flex" justify="space-around" align="middle">
              <Col span={7}>屋顶使用方式:</Col><Col span={14} style={{ margin: "3px" }}>{info.roof}</Col>
            </Row>
            <Row type="flex" justify="space-around" align="middle">
              <Col span={7}>运行状态:</Col><Col span={14} style={{ margin: "3px" }}>{info.runState}</Col>
            </Row>
            <Row type="flex" justify="space-around" align="middle">
              <Col span={7}>并网状态:</Col><Col span={14} style={{ margin: "3px" }}>{info.netState}</Col>
            </Row>
            <Row type="flex" justify="space-around" align="middle">
              <Col span={7}>总光伏发电量:</Col><Col span={14} style={{ margin: "3px" }}>{info.totalPower}</Col>
            </Row>
          </div > : <Spin
            tip="等待数据"
            size="middle"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", lineHeight: "calc(40vh)" }}
          />
      )
    }
    // const inverterColumns = () => {
    //   console.log(historySiteSearchData)
    //   let columns = {}
    //   data[0].map(item => {
    //     if (item != 'time') {

    //       columns.push(
    //         {
    //           title: item,
    //           dataIndex: item,
    //           sorter: (a, b) => { a.item - b.item }
    //         })
    //     }
    //   })
    //   return columns
    // }
    // const setColum = inverterColumns()
    // const columns = [{
    //   title: '时间',
    //   dataIndex: 'time',
    //   sorter: (a, b) => a.time - b.time,
    //   defaultSortOrder: 'descend',
    // }, {
    //   setColum
    // }];
    const columns = [{
      title: '时间',
      dataIndex: 'time',
      sorter: (a, b) => a.time > b.time,
      defaultSortOrder: 'descend',
    },
    {
      title: '逆变器1',
      dataIndex: '逆变器1',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.逆变器1 - b.逆变器1,
    },
    {
      title: '逆变器2',
      dataIndex: '逆变器2',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.逆变器2 - b.逆变器2,
    },
    {
      title: '逆变器3',
      dataIndex: '逆变器3',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.逆变器3 - b.逆变器3,
    },];
    const { chart } = this.props;
    const { siteListWithPosition } = chart;
    return (
      <PageHeaderLayout title="站点查询" >
        {
          siteListWithPosition ?
            <Row>
              <Card
                bordered={false}
                title={< Tooltip placement="bottomLeft" title={this.state.info ? siteInfo : '请选择站点'} > {this.state.info ? (this.state.info.name + "站点信息") : '请选择站点'}</Tooltip>}
                style={{ marginBottom: "12px", overflow: "hidden", width: '100%' }}
                extra={<span>
                  <Cascader options={siteListWithPosition} placeholder='请选择站点' style={{ marginRight: '8px', width: "250px" }} onChange={this.siteChange.bind(this)} />
                  <Select defaultValue='day' onChange={this.timeSelectorChange.bind(this)} style={{ marginRight: "15px" }}>
                    <Option value='day'>单日查询</Option>
                    <Option value='month'>整月查询</Option>
                    <Option value='year'>全年查询</Option>
                  </Select>
                  {this.timeSelector()}
                </span>}
              > {
                  this.state.data ?
                    <Stacked
                      data={this.state.data}

                    />
                    : <Alert
                      message="请选择站点"
                      description="选择站点后，选择要查询的时间查看发电量堆叠分析图"
                      type="info"
                    />
                }
              </Card >
            </Row >
            : <Spin
              tip="等待数据"
              size="middle"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", lineHeight: "calc(40vh)" }}
            />}
        <Row>
          <Col>
            <Card
              bordered={false}
              title="逆变器发电量时间表"
              bodyStyle={{ height: 800 }}
            >
              <Table columns={columns} dataSource={this.state.data} onChange={this.onChange} height={800} />
            </Card>
          </Col>
        </Row>
      </PageHeaderLayout >
    )
  }
}
