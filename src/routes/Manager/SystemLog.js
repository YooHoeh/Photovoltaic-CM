import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  Tag,
  Select,
  DatePicker
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './SystemLog.less';
const Option = Select.Option;
const FormItem = Form.Item;

@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()


export default class TableList extends PureComponent {
  state = {
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
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


  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };
      console.log(values)
      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'rule/fetchWarningList',
        payload: values,
      });
    });
  };



  renderSimpleForm(warningTagList) {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={5} sm={24}>
            <FormItem label="操作类型">
              {getFieldDecorator('warnType')(<Select
                style={{ width: '100%' }}
                placeholder="请选择日志类型"
              >
                <Option value='1'>操作日志</Option>
                <Option value='0'>登录日志</Option>
              </Select>)}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="选择日期">
              {getFieldDecorator('timeRange')(
                <DatePicker />
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

    const {
      rule: { warningList, warningTagList },
    } = this.props;

    const columns = [

      {
        title: '日志编号',
        dataIndex: 'id',
      },
      {
        title: '日志内容',
        dataIndex: 'content',
      },
      {
        title: '日志时间',
        dataIndex: 'time',
      },
      {
        title: '备注',
        dataIndex: 'agent',
      },
      {
        title: '访问源IP',
        dataIndex: 'ip',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.ip > b.ip,
        align: 'right',
      },
      {
        title: '日志类型',
        align: 'right',
        dataIndex: 'type',
        render: (type, recode) => (
          type
            ? <Tag>操作日志</Tag>
            : <Tag>登录日志</Tag>
        ),

      },
    ];



    return (
      <PageHeaderLayout title="操作日志" >
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm(warningTagList)}</div>
            <Table columns={columns} dataSource={warningList} onChange={this.onTableChange} />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
