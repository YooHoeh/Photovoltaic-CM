import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
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
  message,
  Badge,
  Divider,
  Radio,
  TreeSelect
} from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Inverter.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ["待机", "并网", "故障", "关机", "离网"];
const cityList = [
  {
    title: '郑州市',
    value: '410100',
    key: '410100',
    children: [
      {
        title: '市辖区',
        value: '410101',
        key: '410101',
      },
      {
        title: '中原区',
        value: '410102',
        key: '410102',
      },
      {
        title: '二七区',
        value: '410103',
        key: '410103',
      },
      {
        title: '管城回族区',
        value: '410104',
        key: '410104',
      },
      {
        title: '金水区',
        value: '410105',
        key: '410105',
      },
      {
        title: '上街区',
        value: '410106',
        key: '410106',
      },
      {
        title: '惠济区',
        value: '410108',
        key: '410108',
      },
      {
        title: '中牟县',
        value: '410122',
        key: '410122',
      },
      {
        title: '巩义市',
        value: '410181',
        key: '410181',
      },
      {
        title: '荥阳市',
        value: '410183',
        key: '410183',
      },
      {
        title: '新密市',
        value: '410183',
        key: '410183',
      },
      {
        title: '新郑市',
        value: '410184',
        key: '410184',
      },
      {
        title: '登封市',
        value: '410185',
        key: '410185',
      },
    ],
  },
  {
    title: '开封市',
    value: '410200',
    key: '410200',
    children: [
      {
        title: '新郑市',
        value: '410184',
        key: '410184',
      },
      {
        title: '新郑市',
        value: '410184',
        key: '410184',
      },
      {
        title: '新郑市',
        value: '410184',
        key: '410184',
      },
      {
        title: '新郑市',
        value: '410184',
        key: '410184',
      },
      {
        title: '新郑市',
        value: '410184',
        key: '410184',
      },
      {
        title: '新郑市',
        value: '410184',
        key: '410184',
      },
      {
        title: '新郑市',
        value: '410184',
        key: '410184',
      },
      {
        title: '新郑市',
        value: '410184',
        key: '410184',
      },
      {
        title: '新郑市',
        value: '410184',
        key: '410184',
      },
      {
        title: '新郑市',
        value: '410184',
        key: '410184',
      },
      {
        title: '新郑市',
        value: '410184',
        key: '410184',
      },
    ],
  },
];
const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  const handleReset = () => {
    form.resetFields();
  };

  return (
    <Modal
      title="新建逆变器"
      visible={modalVisible}
      onOk={okHandle}
      width="430px"
      onCancel={() => handleModalVisible()}
      footer={[
        <Button key="reset" onClick={handleReset}>
          重置
        </Button>,
        <Button key="submit" type="primary" onClick={okHandle}>
          确认
        </Button>,
      ]}
    >

      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="逆变器编号">
        {form.getFieldDecorator('id', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="所属站点编号">
        {form.getFieldDecorator('id', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="机器型号">
        {form.getFieldDecorator('desc', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="组串总数">
        {form.getFieldDecorator('coordinate', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(
          <Input
            placeholder="请输入"
          />
        )}
      </FormItem>

      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="支路总数">
        {form.getFieldDecorator('coordinate', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(
          <Input
            placeholder="请输入"
          />
        )}
      </FormItem>

      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="协议类型">
        {form.getFieldDecorator('runState', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(
          <Radio.Group defaultValue="0" buttonStyle="solid">
            <Radio.Button value="0" defaultChecked={true}>
              三相协议
                </Radio.Button>
            <Radio.Button value="1">单相协议</Radio.Button>
            <Radio.Button value="2">PID协议</Radio.Button>
          </Radio.Group>
        )}
      </FormItem>

    </Modal>
  );
});
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

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'rule/remove',
          payload: {
            no: selectedRows.map(row => row.no).join(','),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
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
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'rule/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/add',
      payload: {
        description: fields.desc,
      },
    });

    message.success('添加成功');
    this.setState({
      modalVisible: false,
    });
  };

  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="站点编号">
              {getFieldDecorator('no')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="运行使用状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="机器型号">
              {getFieldDecorator('no')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                  <Option value="2">建设中</Option>
                  <Option value="3">告警</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="调用次数">
              {getFieldDecorator('number')(<InputNumber style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="更新日期">
              {getFieldDecorator('date')(
                <DatePicker style={{ width: '100%' }} placeholder="请输入更新日期" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status3')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                  <Option value="2">建设中</Option>
                  <Option value="3">告警</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status4')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                  <Option value="2">建设中</Option>
                  <Option value="3">告警</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a>
          </div>
        </div>
      </Form>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const {
      rule: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible } = this.state;

    const columns = [
      {
        title: '机器型号',
        dataIndex: 'no',
      },
      {
        title: '站点编号',
        dataIndex: 'siteNum',
      },
      {
        title: '光伏组串总数',
        dataIndex: 'description',
        sorter: true,
        align: 'right',
        render: val => `${val} 千`,
      },
      {
        title: '光伏支路总数',
        dataIndex: 'callNo',
        sorter: true,
        align: 'right',
        render: val => `${val} 千`,
        // mark to display a total number
        needTotal: true,
      },
      {
        title: '运行状态',
        dataIndex: 'status',
        filters: [
          {
            text: status[0],
            value: 0,
          },
          {
            text: status[1],
            value: 1,
          },
          {
            text: status[2],
            value: 2,
          },
          {
            text: status[3],
            value: 3,
          },
        ],
        onFilter: (value, record) => record.status.toString() === value,
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />;
        },
      },
      {
        title: '操作',
        render: () => (
          <Fragment>
            <a href="">编辑逆变器信息</a>
            <Divider type="vertical" />
          </Fragment>
        ),
      },
    ];

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    return (
      <PageHeaderLayout title="逆变器列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建逆变器
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button>批量操作</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
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
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
      </PageHeaderLayout>
    );
  }
}
