import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Switch,
  Select,
  DatePicker
} from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './index.less';
const Option = Select.Option;
const FormItem = Form.Item;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

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
      type: 'rule/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    console.log("pagination, filtersArg, sorter" + pagination, filtersArg, sorter)
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'rule/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'rule/fetch',
      payload: {},
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
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
        type: 'rule/fetch',
        payload: values,
      });
    });
  };



  renderSimpleForm() {
    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={9} sm={24}>
            <FormItem label="告警类型">
              {getFieldDecorator('warnType')(<Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="请选择需要显示的告警类型"
              >
                {children}
              </Select>)}
            </FormItem>
          </Col>
          <Col md={9} sm={24}>
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

  render() {
    function onChange(checked) {
      console.log(`switch to ${checked}`);
    }
    const changeCheckStatuHandle = (e) => {
      console.log(e.target.name)
    }
    const {
      rule: { data },
      loading,
    } = this.props;
    const { selectedRows } = this.state;

    const columns = [

      {
        title: '告警编号',
        dataIndex: 'id',
      },
      {
        title: '告警逆变器编号',
        dataIndex: 'inverterID',
      },
      {
        title: '所属站点编号',
        dataIndex: 'siteName',
        sorter: true,
      },
      {
        title: '告警类型',
        dataIndex: 'type',
      },
      {
        title: '告警时间',
        dataIndex: 'time',
        sorter: true,
        align: 'right',
      },
      {
        title: '处理状态',
        align: 'right',
        dataIndex: 'check',
        render: (check, recode) => (
          check
            ? <a href="javascript:;" name={recode.id} onClick={changeCheckStatuHandle}><Switch checkedChildren="已处理" unCheckedChildren="未处理" defaultChecked onChange={onChange} /></a>
            : <a href="javascript:;" name={recode.id} onClick={changeCheckStatuHandle}><Switch checkedChildren="已处理" unCheckedChildren="未处理" onChange={onChange} /></a>
        ),

      },
    ];



    return (
      <PageHeaderLayout title="告警列表" >
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
