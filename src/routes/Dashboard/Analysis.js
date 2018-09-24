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
  Spin,
  message
} from 'antd';
import numeral from 'numeral';
import {
  ChartCard,
  Field,
  Bar,
  TimelineChart,
} from 'components/Charts';
import Trend from '../../components/Trend';
import { getTimeDistance, codeToCityName } from '../../utils/utils';
import styles from './Analysis.less';
import MapCard from '../../components/Amap';
import IconFont from "../../components/IconFont";
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
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
    isToday: 'today'

  }


  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/fetch',
    });
    dispatch({
      type: 'global/getHomePageInfo',
    });
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


  selectDate = type => {
    this.setState({
      isToday: type
    });
  };



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

    const { chart, loading, weather, city, global } = this.props;
    const {
      searchData,
    } = chart;
    const { allHomePageInfo } = global
    const timeLineChartData = () => {
      const timeChartData = [];
      const origin = allHomePageInfo.province;
      origin.map(item => {
        timeChartData.push({
          x: item.index,
          y1: parseInt(item.power),
          y2: parseInt(item.carbon),
        })
      })
      return timeChartData
    }

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

    const WeatherCard = () => {
      const weatherIcon = (weather) => {
        switch (weather) {
          case "晴":
            return <IconFont type="icon-tianqi-qing" />
          case "阴":
            return <IconFont type="icon-yintian" />
          case "雾":
          case "轻雾":
            return <IconFont type="icon-tianqi-wu" />
          case "雷阵雨":
          case "雷阵雨并伴有冰雹":
            return <IconFont type="icon-leidian" />
          case "多云":
            return <IconFont type="icon-duoyun" />
          case "小雨":
          case "中雨":
          case "大雨":
          case "阵雨":
          case "暴雨":
          case "小雨-中雨":
          case "中雨-大雨":
          case "大雨-暴雨":
          case "暴雨-大暴雨":
          case "大暴雨-特大暴雨":
          case "小雨":
          case "中雨":
          case "大雨":
          case "阵雨":
          case "暴雨":
          case "小雨-中雨":
          case "中雨-大雨":
          case "大雨-暴雨":
          case "暴雨-大暴雨":
          case "大暴雨-特大暴雨":
            return <IconFont type="icon-xiaoyu" />
          case "小雪":
          case "中雪":
          case "大雪":
          case "阵雪":
          case "暴雪":
          case "小雪-中雪":
          case "中雪-大雪":
          case "大雪-暴雪":
            return <IconFont type="icon-xue" />
        }
      }
      if (weather == undefined) {
        return <div>无法获取天气数据</div>
      } else {
        return (
          <div >
            <Row>
              <Col span="10" >
                <Row>
                  <b style={{ fontSize: "18px" }}>{weather.城市}</b> {weatherIcon(weather.天气)}<hr />
                </Row>
                <Row>
                  <span style={{ textAlign: 'center', fontSize: "15px", fontWeight: "bold", verticalAlign: "middle" }}>{weather.天气}</span>
                </Row>
              </Col>
              <Col span="13" style={{ paddingLeft: "13px" }}>
                <Row>
                  <Field label="温度:" value={weather.温度} />
                </Row>
                <Row>
                  <Field label="风向:" value={weather.风向} />
                </Row>
                <Row>
                  <Field label="风力:" value={weather.风力} />
                </Row>
                <Row>
                  <Field label="空气湿度:" value={weather.空气湿度} />
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
          <a onClick={() => this.selectDate('today')}>
            今日
          </a>
          <a onClick={() => this.selectDate('yesterday')}>
            昨日
          </a>
        </div>

      </div>
    );
    const allCityColums = [
      {
        title: '区域',
        dataIndex: 'city',
        key: 'city',
        render: text => codeToCityName(text),
      },

      {
        title: '发电量',
        dataIndex: 'power',
        key: 'power',
        align: 'right',
        sorter: (a, b) => a.power - b.power,
        className: styles.alignRight,
      },
      {
        title: '建站数',
        align: 'right',
        dataIndex: 'install',
        key: 'install',
        sorter: (a, b) => a.install - b.install,
        className: styles.alignRight,
      },
    ]
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
        title: '天发电量',
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
        title: '告警数量',
        dataIndex: 'num',
        key: 'num',
        sorter: (a, b) => a.num - b.num,
        className: styles.alignRight,
      },

    ];

    const backToAll = () => {
      const { dispatch } = this.props;
      dispatch({
        type: 'global/changeMapView',
        payload: ""
      });
    }


    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 12 },
    };
    const dayCarbonPower = (time, type) => {
      const day = [];
      if (time == 'today') {
        if (type == 'carbon') {
          allHomePageInfo.city_today.map(item => {
            day.push({
              x: codeToCityName(item.city),
              y: parseInt(item.carbon)
            })
          })
        } else {
          allHomePageInfo.city_today.map(item => {
            day.push({
              x: codeToCityName(item.city),
              y: parseInt(item.power)
            })

          })
        }

      } else {
        if (type == 'carbon') {
          allHomePageInfo.city_yestoday.map(item => {
            day.push({
              x: codeToCityName(item.city),
              y: parseInt(item.carbon)
            })
          })
        } else {
          allHomePageInfo.city_yestoday.map(item => {
            day.push({
              x: codeToCityName(item.city),
              y: parseInt(item.power)
            })
          })
        }
      }
      console.log(day)
      return day

    }
    return (
      allHomePageInfo.status === undefined
        ?
        <Spin
          tip=" 若长时间未加载，请刷新重试"
          size="large"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", lineHeight: "calc(40vh)" }}
        />
        :
        < Fragment >
          <Row gutter={12}>
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
                contentHeight={46}
              >
                {allHomePageInfo.status
                  ? <Fragment>
                    <Row>
                      <Col span={12}> <Field label="运行中" value={allHomePageInfo.status.status0} /></Col>
                      <Col span={12}> <Field label="建设中" value={allHomePageInfo.status.status1} /></Col>
                    </Row>
                    <Row>
                      <Col span={12}> <Field label="建设目标" value={allHomePageInfo.status.status2} /></Col>
                      <Col span={12}> <Field label="告警" value={allHomePageInfo.status.status3} /></Col>
                    </Row>
                  </Fragment>
                  : "数据获取异常"
                }
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
                total={numeral(allHomePageInfo.total_power).format('0,0') + ' 千瓦'}
                footer={<Field label="日发电量" value={`${numeral(allHomePageInfo.day_power).format('0,0')} 千瓦`} />}
                contentHeight={46}
              >
                <Row>
                  <Col span={12}><Field label="今年发电量：" value={`${numeral(allHomePageInfo.year.power).format('0,0')} 千瓦`} /></Col>
                  <Col span={12}><Field label="本月发电量：" value={`${numeral(allHomePageInfo.month.power).format('0,0')} 千瓦`} /></Col>
                </Row>
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
                <Row>
                  <Col span={12}><Field label="今年碳补偿量：" value={`${numeral(allHomePageInfo.year.carbon).format('0,0')} Kg`} /></Col>
                  <Col span={12}><Field label="本月碳补偿量：" value={`${numeral(allHomePageInfo.month.carbon).format('0,0')} Kg`} /></Col>
                </Row>
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
                contentHeight={46}
                footer={<WeatherFooter />}
                total=""
              >
                <WeatherCard />
              </ChartCard>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col xl={18} lg={24} md={24} sm={24} xs={24}>
              <Card
                loading={loading}
                className={styles.salesCard}
                bordered={false}
                bodyStyle={{ padding: 12 }}
                style={{ minHeight: 550, marginBottom: 12 }}
              >
                <MapCard dispatch={this.props.dispatch} station={allHomePageInfo.area_station} ></MapCard>
                {/* <iframe src="http://127.0.0.1:5500/HtmlPage1.html"
                className={styles.mapInter}>
              </iframe> */}
              </Card>
            </Col>
            <Col xl={6} lg={24} md={24} sm={24} xs={24}>
              {global.mapView === '' ? (
                <Card
                  loading={loading}
                  bordered={false}
                  className={styles.salesCard}
                  title="全省站点信息"
                  bodyStyle={{ padding: 12 }}
                  style={{ minHeight: 550, marginBottom: 12 }}
                >
                  <Table
                    rowKey={record => record.index}
                    size="small"
                    columns={allCityColums}
                    dataSource={allHomePageInfo.city_power}
                    pagination={{
                      style: { marginBottom: 0 },
                      pageSize: 10,
                    }}
                  />
                </Card>
              )
                : (global.mapView === "city" ? (
                  <Card
                    loading={loading}
                    bordered={false}
                    className={styles.salesCard}
                    title={city + "区域站点信息"}
                    bodyStyle={{ padding: 12 }}
                    style={{ minHeight: 550, marginBottom: 12 }}
                    extra={<span onClick={backToAll} style={{ color: "#7086bb" }}>显示全省信息</span>}
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
                      style={{ minHeight: 550, marginBottom: 12 }}
                      extra={<span onClick={backToAll} style={{ color: "#7086bb" }}>显示全省信息</span>}

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
                  ))
              }
            </Col>
          </Row>
          <Row >
            {
              global.mapView === "" ? (
                <Card
                  loading={loading}
                  className={styles.offlineCard}
                  bordered={false}
                  title="全省总量曲线图"
                  bodyStyle={{ padding: 12 }}
                  style={{ marginBottom: 12 }}
                >
                  <div style={{ padding: '0 24px' }}>
                    <TimelineChart
                      height={400}
                      data={timeLineChartData()}
                      titleMap={{ y1: '发电量', y2: '碳补偿量' }}
                    />
                  </div>
                </Card>
              ) :
                global.mapView === "city" ? (
                  <Card
                    loading={loading}
                    className={styles.offlineCard}
                    bordered={false}
                    title={city + "区域总量曲线图"}
                    bodyStyle={{ padding: '0 0 12px 0' }}
                    style={{ marginBottom: 12 }}
                    extra={<span onClick={backToAll} style={{ color: "#7086bb" }}>显示全省信息</span>}

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
                    style={{ marginBottom: 12 }}
                    extra={<span onClick={backToAll} style={{ color: "#7086bb" }}>显示全省信息</span>}
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
          </Row>
          <Row gutter={12}>
            <Col xl={18} lg={24} md={24} sm={24} xs={24}>
              <Card
                loading={loading}
                bordered={false}
                bodyStyle={{ padding: 0 }}
                style={{ marginBottom: 12 }}
              >
                <div className={styles.salesCard}>
                  <Tabs tabBarExtraContent={salesExtra} size="large" tabBarStyle={{ marginBottom: 24 }}>
                    <TabPane tab="发电量" key="sales">
                      <div className={styles.salesBar}>
                        <Bar height={255} data={dayCarbonPower(this.state.isToday, "power")} />
                      </div>
                    </TabPane>
                    <TabPane tab="碳补偿" key="views">
                      <Row>
                        <div className={styles.salesBar}>
                          <Bar height={255} data={dayCarbonPower(this.state.isToday, "corbon")} />
                        </div>
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
                style={{ marginBottom: 12 }}
              // contentHeight:
              >
                <Table
                  rowKey={record => record.index}
                  size="small"
                  height={255}
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
    )
  }
}
