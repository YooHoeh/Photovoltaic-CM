import React from 'react';
import { Card, Checkbox, Row, Col, Divider, Input, Modal, DatePicker, Button, Table, Tag } from "antd";
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
const { RangePicker } = DatePicker;

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
    const columns = [
      {
        title: '维保日志编号',
        dataIndex: 'id',
        sorter: (a, b) => a.name.length - b.name.length,
      },
      {
        title: '维保负责人',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
      },
      {
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
        onFilter: (value, record) => (
          record.type.map(item => {
            if (item == value) { return true }
          }
          )
        ),
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

      },
      {
        title: "操作",
        align: 'right',
        render: (text, record) => (
          <span>
            <a href="javascript:;" name={record.id} type={record.userType} onClick={open}>查看</a>
            <Divider type='vertical' />
            <a href="javascript:;" name={record.id} onClick={del}>删除</a>
          </span>
        ),
      }
    ];
    const open = (e) => {
      const name = e.target.name;

    }
    const del = (e) => {
      const name = e.target.name
      const confirmChange = () => {
        console.log(name)
      }
      Modal.confirm({
        title: '删除维保日志',
        onOk: confirmChange,
        cancelText: '取消',
        okText: '确认',
        content: `确认删除日志：${name}  吗？此操作无法撤销！`
      });

    }
    return (
      <PageHeaderLayout title="维保日志">
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
