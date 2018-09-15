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
  Badge,
  Divider,
  TreeSelect,
  Table,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Basiccolumn from "../../components/Basiccolumn";
import styles from './Inverter.less';
const { RangePicker } = DatePicker;
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
  title: 'Age',
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
@connect(({ rule, loading }) => ({
  rule,
}))

export default class SiteHis extends PureComponent {
  state = {

  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetch',
    });
  }
  render() {
    function onChange(pagination, filters, sorter) {
      console.log('params', pagination, filters, sorter);
    }
    const SiteInfoBorad = (inverter) => {
      const item = {
        "margin": "14px",
      }

      return (
        <div>
          <Row type="flex" justify="space-around" align="middle">
            <Col span={7}>编号:</Col>
            <Col span={14} style={item}>{inverter.id}</Col>
          </Row>
          <Row type="flex" justify="space-around" align="middle">
            <Col span={7}>所属站点:</Col>
            <Col span={14} style={item}>{inverter.site}</Col>
          </Row>
          <Row type="flex" justify="space-around" align="middle">
            <Col span={7}>机器型号:</Col>
            <Col span={14} style={item}>{inverter.model}</Col>
          </Row>
          <Row type="flex" justify="space-around" align="middle">
            <Col span={7}>机器串号:</Col>
            <Col span={14} style={item}>{inverter.serial}</Col>
          </Row>
          <Row type="flex" justify="space-around" align="middle">
            <Col span={7}>协议类型:</Col>
            <Col span={14} style={item}>{inverter.agreement}</Col>
          </Row>
          <Row type="flex" justify="space-around" align="middle">
            <Col span={7}>光伏组串总数:</Col>
            <Col span={14} style={item}>{inverter.mpptNum}</Col>
          </Row>
          <Row type="flex" justify="space-around" align="middle">
            <Col span={7}>光伏支路总数:</Col>
            <Col span={14} style={item}>{inverter.pvNum}</Col>
          </Row>
          <Row type="flex" justify="space-around" align="middle">
            <Col span={7}>总光伏发电量:</Col>
            <Col span={14} style={item}>{inverter.totalPower}</Col>
          </Row>
          <Row type="flex" justify="space-around" align="middle">
            <Col span={7}>运行状态状态:</Col>
            <Col span={14} style={item}>{inverter.runState}</Col>
          </Row>
          <Row type="flex" justify="space-around" align="middle">
            <Col span={7}>更新时间:</Col>
            <Col span={14} style={item}>{inverter.date}</Col>
          </Row>
        </div>
      )
    }
    return (
      <PageHeaderLayout title="逆变器查询">
        <Row gutter={12}>
          <Col md={16} sm={24} >
            <Card
              bordered={false}
              title="逆变器发电量"
              style={{ marginBottom: "12px" }}
              extra={<RangePicker onChange={onChange} />}
            >
              <Basiccolumn />
            </Card>
          </Col>
          <Col md={8} sm={24}>
            <Card
              bordered={false}
              title="逆变器信息"
              style={{ marginBottom: "12px" }}
            >
              {SiteInfoBorad(inverter)}
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card
              bordered={false}
              title="逆变器发电量碳补偿量"
              bodyStyle={{ height: 800 }}
            >
              <Table columns={columns} dataSource={data} onChange={onChange} height={800} />
            </Card>
          </Col>
        </Row>

      </PageHeaderLayout>
    )
  }
}
