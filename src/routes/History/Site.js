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
  Table
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Stacked from "../../components/StackMap";
import styles from './Site.less';

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
const site = {
  name: "光伏电站001",
  position: "河南省郑州市中华园区北城街",
  coordinate: "113.123124,224.123454",
  disignCount: "50000kW",
  buildCount: "48000kW",
  totalPower: "60000kW",
  runState: "建设中",
  netState: "已并网",
  roof: "租赁",
  area: "200㎡"
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
    const SiteInfoBorad = (site) => {
      const item = {
        "margin": "14px",
      }

      return (
        <div>
          <Row type="flex" justify="space-around" align="middle">
            <Col span={7}>名称:</Col><Col span={14} style={item}>{site.name}</Col>
          </Row>
          <Row type="flex" justify="space-around" align="middle">
            <Col span={7}>位置:</Col><Col span={14} style={item}>{site.position}</Col>
          </Row>
          <Row type="flex" justify="space-around" align="middle">
            <Col span={7}>坐标:</Col><Col span={14} style={item}>{site.coordinate}</Col>
          </Row>
          <Row type="flex" justify="space-around" align="middle">
            <Col span={7}>设计容量:</Col><Col span={14} style={item}>{site.disignCount}</Col>
          </Row>
          <Row type="flex" justify="space-around" align="middle">
            <Col span={7}>建设容量:</Col><Col span={14} style={item}>{site.buildCount}</Col>
          </Row>
          <Row type="flex" justify="space-around" align="middle">
            <Col span={7}>占用面积:</Col><Col span={14} style={item}>{site.area}</Col>
          </Row>
          <Row type="flex" justify="space-around" align="middle">
            <Col span={7}>屋顶使用方式:</Col><Col span={14} style={item}>{site.roof}</Col>
          </Row>
          <Row type="flex" justify="space-around" align="middle">
            <Col span={7}>运行状态:</Col><Col span={14} style={item}>{site.runState}</Col>
          </Row>
          <Row type="flex" justify="space-around" align="middle">
            <Col span={7}>并网状态:</Col><Col span={14} style={item}>{site.netState}</Col>
          </Row>
          <Row type="flex" justify="space-around" align="middle">
            <Col span={7}>总光伏发电量:</Col><Col span={14} style={item}>{site.totalPower}</Col>
          </Row>
        </div>
      )
    }
    return (
      <PageHeaderLayout title="站点查询">
        <Row gutter={12}>
          <Col md={16} sm={24} >
            <Card
              bordered={false}
              title="站点发电量组成"
              style={{ marginBottom: "12px" }}
            >
              <Stacked />
            </Card>
          </Col>
          <Col md={8} sm={24}>
            <Card
              bordered={false}
              title="站点信息"
              style={{ marginBottom: "12px" }}
            >
              {SiteInfoBorad(site)}
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card
              bordered={false}
              title="站点逆变器组成详情"
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
