import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Table,
  Radio,
  DatePicker,
  Tooltip,
  Menu,
  Dropdown,
  message
} from 'antd';
import numeral from 'numeral';
import {
  ChartCard,
  yuan,
  MiniArea,
  MiniBar,
  MiniProgress,
  Field,
  Bar,
  Pie,
  TimelineChart,
} from 'components/Charts';
import Trend from 'components/Trend';
import NumberInfo from 'components/NumberInfo';
import CountDown from 'components/CountDown';

import { getTimeDistance } from '../../utils/utils';

import styles from './Analysis.less';
import MapCard from 'components/Amap';
import IconFont from "../../components/IconFont";
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const targetTime = new Date().getTime() + 3900000;
const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `站点 ${i} `,
    total: 323234,
  });
}
const offlineChartData1 = [];
for (let i = 0; i < 20; i += 1) {
  offlineChartData1.push({
    x: new Date().getTime() + 1000 * 60 * 30 * i,
    y1: Math.floor(Math.random() * 100) + 10,
    y2: Math.floor(Math.random() * 100) + 10,
  });
}
const Yuan = ({ children }) => (
  <span
    dangerouslySetInnerHTML={{ __html: yuan(children) }} /* eslint-disable-line react/no-danger */
  />
);

@connect(({ chart, loading, global = {} }) => ({
  // chart,
  loading: loading.effects['chart/fetch'],
  weather: global.weather,
  city: global.city,
  global,
  chart

}))

export default class Analysis extends Component {
  state = {
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),

  };
  componentWillMount() {
    this.initHomePage()

  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/fetch',
    });
    // setInterval(this.initHomePage, 900000)
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
  }

  handleChangeSalesType = e => {
    this.setState({
      salesType: e.target.value,
    });
  };
  initHomePage = (allHomePageInfo) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/getHomePageInfo',
      payload: allHomePageInfo
    });

  }
  handleTabChange = key => {
    this.setState({
      currentTabKey: key,
    });
  };

  handleRangePickerChange = rangePickerValue => {
    this.setState({
      rangePickerValue,
    });

    const { dispatch } = this.props;
    dispatch({
      type: 'chart/fetchSalesData',
    });
  };

  selectDate = type => {
    this.setState({
      rangePickerValue: getTimeDistance(type),
    });

    const { dispatch } = this.props;
    dispatch({
      type: 'chart/fetchSalesData',
    });
  };

  isActive(type) {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return;
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
  }

  ttt = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/ttt',
    });

    const { chart } = this.props;
    const { tt } = chart;


    message.success(JSON.stringify(tt))

  }

  render() {

    const { rangePickerValue, salesType, currentTabKey } = this.state;
    const { chart, loading, weather, city, global } = this.props;
    const {
      visitData,
      visitData2,
      salesData,
      searchData,
      offlineData,
      offlineChartData,
      salesTypeData,
      salesTypeDataOnline,
      salesTypeDataOffline,
    } = chart;
    const { allHomePageInfo } = global
    const salesPieData =
      salesType === 'all'
        ? salesTypeData
        : salesType === 'online'
          ? salesTypeDataOnline
          : salesTypeDataOffline;
    const nowTime = new Date().toLocaleDateString()
    const WeatherFooter = () => {
      if (weather == undefined) {
        return (
          <div>无法获取天气数据</div>
        )
      } else {
        return (
          <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
            发布时间： {weather.发布时间}
          </div>
        )
      }
    }

    const weatherCard = () => {
      if (weather == undefined) {
        return
        <div>无法获取天气数据</div>
      } else {
        return (
          < div className={styles.weatherCard} >
            <Row>
              <Col span="8" >
                <Row>
                  <b style={{ fontSize: "18px" }}>{weather.城市}</b><hr />
                </Row>
                <Row>
                  <span style={{ fontWeight: "bold", fontSize: "15px", textAlign: 'center' }}>{weather.天气}</span>
                </Row>
              </Col>
              <Col span="16" style={{ paddingLeft: "13px" }}>
                <Row>
                  温度:<span>{weather.温度}</span>
                </Row>
                <Row>
                  风向:<span>{weather.风向}</span>
                </Row>
                <Row>
                  风力:<span>{weather.风力}</span>
                </Row>
                <Row>
                  空气湿度:<span>{weather.空气湿度}</span>
                </Row>
              </Col>
            </Row>
          </div >
        )

      }
    };

    const salesExtra = (
      <div className={styles.salesExtraWrap}>
        <div className={styles.salesExtra}>
          <a className={this.isActive('today')} onClick={() => this.selectDate('today')}>
            今日
          </a>
          <a className={this.isActive('week')} onClick={() => this.selectDate('week')}>
            昨日
          </a>
        </div>
        <RangePicker
          value={rangePickerValue}
          onChange={this.handleRangePickerChange}
          style={{ width: 256 }}
        />
      </div>
    );

    const columns = [
      {
        title: '区域',
        dataIndex: 'keyword',
        key: 'keyword',
        render: text => <a href="/">{text}</a>,
      },

      {
        title: '容量',
        dataIndex: 'count',
        key: 'count',
        sorter: (a, b) => a.count - b.count,
        className: styles.alignRight,
      },
      {
        title: '发电量',
        dataIndex: 'count',
        key: 'range',
        sorter: (a, b) => a.range - b.range,
        className: styles.alignRight,
      },
    ];
    const siteColumns = [
      {
        title: '机器型号',
        dataIndex: 'keyword',
        key: 'keyword',
        render: text => <a href="/">{text}</a>,
      },

      {
        title: '运行状态',
        dataIndex: 'count',
        key: 'count',
        sorter: (a, b) => a.count - b.count,
        className: styles.alignRight,
      },

    ];
    const warnColumns = [
      {
        title: '站点名字',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="/">{text}</a>,
      },

      {
        title: '告警逆变器数量',
        dataIndex: 'num',
        key: 'num',
        sorter: (a, b) => a.num - b.num,
        className: styles.alignRight,
      },

    ];

    const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name);



    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 },
    };

    return (
      <Fragment>
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="装机容量"
              loading={loading}
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={numeral(allHomePageInfo.station_all).format('0,0')}
              footer={<Field label="今年已建设" value={allHomePageInfo.station_year} />}
              contentHeight={49}
            >
              <Row>
                <Col span={12}> <Field label="运行中" value={allHomePageInfo.station_year} /></Col>
                <Col span={12}> <Field label="建设中" value="1211" /></Col>
              </Row>
              <Row>
                <Col span={12}> <Field label="建设目标" value="1211" /></Col>
                <Col span={12}> <Field label="告警" value="1211" /></Col>
              </Row>


            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="总发电量"
              loading={loading}
              onClick={this.ttt}
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={numeral(allHomePageInfo.total_powers).format('0,0')}
              footer={<Field label="日发电量" value={`${numeral(allHomePageInfo.day_power).format('0,0')}瓦`} />}
              contentHeight={46}
            >
              <Trend flag="up" style={{ marginRight: 16 }}>
                周同比
                <span className={styles.trendText}>12%</span>
              </Trend>
              <Trend flag="down">
                日环比
                <span className={styles.trendText}>11%</span>
              </Trend>
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="碳补偿量"
              loading={loading}
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={numeral(allHomePageInfo.total_carbon).format('0,0') + " Kg"}
              footer={<Field label="日碳补偿量" value={numeral(allHomePageInfo.day_carbon).format('0,0') + "Kg"} />}
              contentHeight={46}
            >
              <MiniArea color="#975FE4" data={visitData} />
            </ChartCard>
          </Col>

          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="天气信息"
              loading={loading}
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              // total="78%"
              footer={<WeatherFooter />}
            // contentHeight={90}
            >
              {weatherCard()}
              {/* <MiniProgress percent={78} strokeWidth={8} target={80} color="#13C2C2" /> */}
            </ChartCard>
          </Col>
        </Row>


        <Row gutter={24}>
          <Col xl={18} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              className={styles.salesCard}
              bordered={false}
              bodyStyle={{ padding: 12 }}
              style={{ minHeight: 550 }}
            >
              <MapCard dispatch={this.props.dispatch} station={allHomePageInfo.area_station} ></MapCard>
              {/* <iframe src="http://127.0.0.1:5500/HtmlPage1.html"
                className={styles.mapInter}>
              </iframe> */}
            </Card>
          </Col>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            {global.mapView === "city" ? (
              <Card
                loading={loading}
                bordered={false}
                className={styles.salesCard}
                title={city + "区域站点信息"}
                bodyStyle={{ padding: 12 }}
                style={{ minHeight: 550 }}
              >
                <Table
                  rowKey={record => record.index}
                  size="small"
                  columns={columns}
                  dataSource={searchData}
                  pagination={{
                    style: { marginBottom: 0 },
                    pageSize: 10,
                  }}
                />
              </Card>) : (
                <Card
                  loading={loading}
                  bordered={false}
                  className={styles.salesCard}
                  title={global.siteName}
                  bodyStyle={{ padding: 12 }}
                  style={{ minHeight: 550 }}
                >
                  <Table
                    rowKey={record => record.index}
                    size="small"
                    columns={siteColumns}
                    dataSource={searchData}
                    pagination={{
                      style: { marginBottom: 0 },
                      pageSize: 10,
                    }}
                  />
                </Card>
              )
            }
          </Col>
        </Row>

        {global.mapView === "city" ? (
          <Card
            loading={loading}
            className={styles.offlineCard}
            bordered={false}
            title={city + "区域总量曲线图"}
            bodyStyle={{ padding: '0 0 12px 0' }}
            style={{ marginTop: 32 }}
          >
            <div style={{ padding: '0 24px' }}>
              <TimelineChart
                height={400}
                data={offlineChartData1}
                titleMap={{ y1: '发电量', y2: '碳补偿量' }}
              />
            </div>
          </Card>) : (<Card
            loading={loading}
            title={global.siteName + "曲线图"}
            className={styles.offlineCard}
            bordered={false}
            bodyStyle={{ padding: '0 0 12px 0' }}
            style={{ marginTop: 32 }}
          >
            <div style={{ padding: '0 24px' }}>
              <TimelineChart
                height={400}
                data={offlineChartData1}
                titleMap={{ y1: '发电量', y2: '碳补偿量' }}
              />
            </div>
          </Card>)
        }
        <Row gutter={24}>
          <Col xl={18} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              bordered={false}
              bodyStyle={{ padding: 0 }}
              style={{ marginTop: 24 }}
            >
              <div className={styles.salesCard}>
                <Tabs tabBarExtraContent={salesExtra} size="large" tabBarStyle={{ marginBottom: 24 }}>
                  <TabPane tab="发电量" key="sales">
                    <div className={styles.salesBar}>
                      <Bar height={295} title={"发电量 " + nowTime} data={salesData} />
                    </div>
                  </TabPane>
                  <TabPane tab="碳补偿" key="views">
                    <Row>
                      <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                        <div className={styles.salesBar}>
                          <Bar height={292} title={"碳补偿量" + nowTime} data={salesData} />
                        </div>
                      </Col>
                      <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                        <div className={styles.salesRank}>
                          <h4 className={styles.rankingTitle}>站点碳补偿排名</h4>
                          <ul className={styles.rankingList}>
                            {rankingListData.map((item, i) => (
                              <li key={item.title}>
                                <span className={i < 3 ? styles.active : ''}>{i + 1}</span>
                                <span>{item.title}</span>
                                <span>{numeral(item.total).format('0,0')}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Col>
                    </Row>
                  </TabPane>
                </Tabs>
              </div>
            </Card>
          </Col>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              bordered={false}
              className={styles.salesCard}
              title="告警列表"
              bodyStyle={{ paddingBottom: 13 }}
              style={{ marginTop: 24 }}
            >
              <Table
                rowKey={record => record.index}
                size="small"
                columns={warnColumns}
                dataSource={allHomePageInfo.warning_info}
                pagination={{
                  style: { marginBottom: 0 },
                  pageSize: 5,
                }}
              />
            </Card>
          </Col>
        </Row>
      </Fragment >
    );
  }
}
