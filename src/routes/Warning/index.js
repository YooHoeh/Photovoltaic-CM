import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  Switch,
  Select,
  Spin,
  DatePicker
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './index.less';
const Option = Select.Option;
const FormItem = Form.Item;

let time;
let selectType;
@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
export default class TableList extends PureComponent {

  state = {
    modalVisible: false,
    expandForm: false,
    formValues: {
    },
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetchWarningList',
    });

  }


  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'rule/fetchWarningList',
      payload: {},
    });
  };

  onDateRangeChange = (value, dateString) => {
    console.log('Formatted Selected Time: ', dateString);
    time = dateString
  }
  onTypeChange = (value, data) => {
    const type = [];
    data.map(item => {
      type.push(item.props.children)
    })
    selectType = type

  }
  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        type: selectType,
        time: time,
      };
      console.log(values)
      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'rule/searchWarningList',
        payload: values,
      });
    });
  };



  renderSimpleForm(warningTagList) {
    const children = [];
    warningTagList.map((item, index) => {
      children.push(<Option key={index}>{item.type}</Option>);
    })
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="告警类型">
              {getFieldDecorator('warnType')(<Select
                mode="multiple"
                style={{ width: '100%' }}
                onChange={this.onTypeChange}
                placeholder="请选择需要显示的告警类型,可多选"
              >
                {children}
              </Select>)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="选择日期">
              {getFieldDecorator('timeRange')(
                <DatePicker onChange={this.onDateRangeChange} />
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  onTableChange = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
  }
  render() {

    const changeCheckStatuHandle = (e) => {
      const id = e.target.parentElement.parentNode.name
      const { dispatch } = this.props;
      dispatch({
        type: 'rule/changeWarnStatus',
        payload: {
          id,
        }
      })
      dispatch({
        type: 'rule/fetchWarningList',
      })

    }
    const {
      rule: { warningList, warningTagList },
    } = this.props;

    const columns = [

      {
        title: '告警编号',
        dataIndex: 'id',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.id - b.id,
      },
      {
        title: '告警逆变器编号',
        dataIndex: 'inverterID',
      },
      {
        title: '所属站点编号',
        dataIndex: 'siteName',
        sorter: (a, b) => a.siteName - b.siteName,
      },
      {
        title: '告警类型',
        dataIndex: 'type',
      },
      {
        title: '告警时间',
        dataIndex: 'time',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.time > b.time,
        align: 'right',
      },
      {
        title: '处理状态',
        align: 'right',
        dataIndex: 'check',
        render: (check, recode) =>
          <a href="javascript:;" name={recode.id} onClick={changeCheckStatuHandle}>
            {check
              ? <Switch checkedChildren="已处理" unCheckedChildren="未处理" />
              : <Switch checkedChildren="已处理" unCheckedChildren="未处理" defaultChecked />
            }
          </a>


      },
    ];



    return (
      <PageHeaderLayout title="告警列表" >
        <Card bordered={false}>
          <div className={styles.tableList}>
            {
              warningTagList
                ? <div className={styles.tableListForm}>{this.renderSimpleForm(warningTagList)}</div>
                : <Spin tip="等待数据" size="middle" style={{ display: "flex", alignItems: "center", justifyContent: "center", lineHeight: "calc(40vh)" }} />
            }
            <Table columns={columns} dataSource={warningList} onChange={this.onTableChange} />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
