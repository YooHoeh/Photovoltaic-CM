import React from 'react';
import { Card, Divider, Input, Modal, DatePicker, Button, Table, Tag } from "antd";
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
const { RangePicker } = DatePicker;

const data = [{
  id: '1',
  name: '雷军',
  siteName: "伏站点",
  type: [0, 2, 3],
  time: "1018-12-01",
  content: '维保内容维保内容维保内容维保内容维保内容维保内容维保内容'
}, {
  id: '2',
  name: '罗永浩',
  siteName: "光伏站点",
  type: [0, 3],
  time: "2018-09-03",
  content: '维保内容维保内容维保内容维保内容维保内容维保内容维保内容'

}, {
  id: '4',
  name: '柳传志',
  siteName: "某光站点",
  type: [0],
  time: "2018-09-02",
  content: '维保内容维保内容维保内容维保内容维保内容维保内容维保内容'
}, {
  id: '5',
  name: '马化腾',
  siteName: "某光伏点",
  type: [1, 4],
  time: "2018-09-01",
  content: '维保内容维保内容维保内容维保内容维保内容维保内容维保内容'

}, {
  id: '6',
  name: '罗永浩',
  siteName: "某点",
  type: [0, 1, 2, 3, 4],
  time: "2018-09-01",
  content: '维保内容维保内容维保内容维保内容维保内容维保内容维保内容'

}, {
  id: '7',
  name: '雷军',
  siteName: "某光伏站点",
  type: [2, 3],
  time: "2017-09-01",
  contentt: '维保内容维保内容维保内容维保内容维保内容维保内容维保内容'
}];
@connect(({ rule }) => ({
  rule,
}))
class Maintetance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetchMaintenanceList',
    });
  }

  onDateRangeChange = (value, dateString) => {
    console.log('Formatted Selected Time: ', dateString);
  }
  onTableChange = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
  }
  open = (e) => {
    const name = e.target.name;

  }
  del = (e) => {
    const name = e.target.name
    const confirmChange = () => {
      console.log(name)
      // const { dispatch } = this.props;
      // dispatch({
      //   type: 'rule/fetchSiteList',
      // });
    }
    Modal.confirm({
      title: '删除维保日志',
      onOk: confirmChange,
      cancelText: '取消',
      okText: '确认',
      content: `确认删除日志：${name}  吗？此操作无法撤销！`
    });

  }
  render() {
    const typeNumToTags = (typeArr) => {
      const out = []
      typeArr.map(item => {
        switch (item) {
          case 0:
            out.push(<Tag color="#2db7f5">并网问题</Tag>); break;
          case 1:
            out.push(<Tag color="#2db7f5">逆变器</Tag>); break;
          case 2:
            out.push(<Tag color="#2db7f5">光伏组件</Tag>); break;
          case 3:
            out.push(<Tag color="#2db7f5">站点环境</Tag>); break;
          case 4:
            out.push(<Tag color="#2db7f5">其他</Tag>); break;
          default: break;
        }
      })
      return <span>{out}</span>
    }
    const columns = [
      {
        title: '维保日志编号',
        dataIndex: 'id',
        sorter: (a, b) => a.id - b.id,
      },
      {
        title: '维保负责人',
        dataIndex: 'people',
        sorter: (a, b) => a.people.length - b.people.length,
      },
      {
        title: '维保站点',
        dataIndex: 'siteName',
        sorter: (a, b) => a.siteName.length - b.siteName.length,
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
          record.type.some(item => item == value ? true : false
          )
        ),
        sorter: (a, b) => a.type.length - b.type.length,
        // render: (type) => typeNumToTags(type)
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
            <a href="javascript:;" name={record.id} type={record.userType} onClick={this.open.bind(this)}>查看</a>
            {/* <Divider type='vertical' />
            <a href="javascript:;" name={record.id} onClick={this.del.bind(this)}>删除</a> */}
          </span>
        ),
      }
    ];
    const { rule: { maintenanceList }, } = this.props;
    return (
      <PageHeaderLayout title="维保日志" >
        <Card
          title="维保日志列表"
          extra={<RangePicker onChange={this.onDateRangeChange} />}
        >

          <Table
            columns={columns}
            dataSource={maintenanceList}
            expandedRowRender={record => <p style={{ margin: 0 }}>{record.content}</p>}
            onChange={this.onTableChange} />
        </Card>
      </PageHeaderLayout >
    )
  }
}
export default Maintetance;
