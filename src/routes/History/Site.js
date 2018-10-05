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


@connect(({ rule, chart = {}, loading }) => ({
  rule,
  chart,
  isRefresh: loading.effects['chart/historySiteSearchData'],
  info: chart.siteInfo,
  data: chart.siteData
}))
export default class SiteHis extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      filter: {
        siteID: "",
        type: '',
        time: ''
      },
      isRefresh: this.props.isRefresh,

    };
    this.onDateChange = this.onDateChange.bind(this)
  }
  componentWillReceiveProps() {
    const { dispatch, data, info } = this.props;

  }
  componentDidMount() {
    const { dispatch, data, info } = this.props;
    dispatch({
      type: 'chart/fetchSiteListWithPosition',
    });


  }
  handleSearch() {
    const { dispatch, data, info } = this.props;
    if (this.state.filter.siteID && this.state.filter.type && this.state.filter.time) {
      dispatch({
        type: 'chart/fetchHistorySiteSearchData',
        fileter: this.state.filter
      });

    }




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
  shouldComponentUpdate(pre, next) {
    return this.state.isRefresh ? true : true
  }
  siteChange(value) {
    this.setState((preState) => ({
      filter: {
        type: preState.filter.type,
        time: preState.filter.time,
        siteID: value[2],
      }
    }), () => this.handleSearch())
  }

  render() {
    const { data, info } = this.props;
    const { chart } = this.props;
    const { siteListWithPosition } = chart;


    function setColum(data) {
      if (data == undefined) { return }

      let columns = [{
        title: '时间',
        dataIndex: 'time',
        sorter: (a, b) => a.time - b.time,
        defaultSortOrder: 'descend',
      },
      ];
      for (let key in data[0]) {
        if (key != 'time') {
          columns.push(
            {
              title: key,
              dataIndex: key,
            })
        }
      }
      return columns
    }
    function setFields(data) {
      if (data == undefined) { return }
      let fields = []
      for (let key in data[0]) {
        if (key != 'time') {
          fields.push(key)
        }
      }
      return fields
    }

    const siteInfoboard = () => {
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



    return (
      <PageHeaderLayout title="站点查询" >
        {
          siteListWithPosition ?
            <Row>
              <Card
                bordered={false}
                title={
                  info.name
                    ? (< Tooltip placement="bottomLeft" title={siteInfoboard} > {info.name + "站点信息"}</Tooltip>)
                    : ('请选择站点')
              }

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
                data[0] ?
                  <Stacked
                    data={data}

                    fields={setFields(data)}
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
            >{
                data
                  ? <Table columns={setColum(data)} dataSource={data} onChange={this.onChange} height={800} />
                  : ''
              }
            </Card>
          </Col>
        </Row>
      </PageHeaderLayout >
    )
  }
}
