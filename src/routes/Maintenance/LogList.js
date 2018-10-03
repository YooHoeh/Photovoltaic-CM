import React from 'react';
import { Card, Divider, Input, Modal, DatePicker, Button, Table, Tag } from "antd";
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
const { RangePicker } = DatePicker;

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
      if (typeArr) {
        const arr = typeArr.split(',')
        const arrNum = [];
        const out = [];
        for (let i = 0; i < arr.length; i++) {
          arrNum.push(parseInt(arr[i]))
        }
        arrNum.map(item => {
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
        return <span>{out}</span>;
      }
      return <span>类型错误</span>

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
        render: (type, b) => typeNumToTags(type, b)
      }, {
        title: "维保时间",
        dataIndex: "time",
        sorter: (a, b) => a.time.length - b.time.length,

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
