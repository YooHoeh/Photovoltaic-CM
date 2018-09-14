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
  Radio,
  message,
  Badge,
  Divider,
  TreeSelect,
} from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Site.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['运行中', '建设中', '建设目标'];
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
      title="新建站点"
      visible={modalVisible}
      onOk={okHandle}
      width="750px"
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
      <Row>
        <Col span={12}>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="站点编号">
            {form.getFieldDecorator('id', {
              rules: [{ required: true, message: 'Please input some description...' }],
            })(<Input placeholder="请输入" />)}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="站点名称">
            {form.getFieldDecorator('desc', {
              rules: [{ required: true, message: 'Please input some description...' }],
            })(<Input placeholder="请输入" />)}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="所属区域">
            {form.getFieldDecorator('locaNum', {
              rules: [{ required: true, message: 'Please input some description...' }],
            })(
              <TreeSelect
                style={{ width: '100%' }}
                value={cityList[1].children[0].title}
                dropdownStyle={{ maxHeight: 300, overflowX: 'hideen' }}
                treeData={cityList}
                placeholder="选择站点所在区域"
                treeDefaultExpandAll
              />
            )}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="站点坐标">
            {form.getFieldDecorator('coordinate', {
              rules: [{ required: true, message: 'Please input some description...' }],
            })(
              <Input
                placeholder="点击图标获取坐标"
                suffix={
                  <a href="https://lbs.amap.com/console/show/picker" target="_blank">
                    <Icon type="environment" style={{ color: 'blue' }} />
                  </a>
                }
              />
            )}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 20 }} label="站点位置">
            {form.getFieldDecorator('location', {
              rules: [{ required: true, message: 'Please input some description...' }],
            })(<Input placeholder="请输入" addonBefore="郑州市-金水区-公安局" />)}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="设计容量">
            {form.getFieldDecorator('designCount', {
              rules: [{ required: true, message: 'Please input some description...' }],
            })(<Input placeholder="请输入" addonAfter="kW" />)}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="建设容量">
            {form.getFieldDecorator('buildCount', {
              rules: [{ required: true, message: 'Please input some description...' }],
            })(<Input placeholder="请输入" addonAfter="kW" />)}
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="占地面积">
            {form.getFieldDecorator('acreage', {
              rules: [{ required: true, message: 'Please input some description...' }],
            })(<Input placeholder="请输入" addonAfter="㎡" />)}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="运行状态">
            {form.getFieldDecorator('runState', {
              rules: [{ required: true, message: 'Please input some description...' }],
            })(
              <Radio.Group defaultValue="0" buttonStyle="solid">
                <Radio.Button value="0" defaultChecked={true}>
                  运行中
                </Radio.Button>
                <Radio.Button value="1">建设中</Radio.Button>
                <Radio.Button value="2">建设目标</Radio.Button>
              </Radio.Group>
            )}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="并网状态">
            {form.getFieldDecorator('netState', {
              rules: [{ required: true, message: 'Please input some description...' }],
            })(
              <Radio.Group defaultValue="0" buttonStyle="solid" style={{ width: "100%" }}>
                <Radio.Button value="0" defaultChecked={true} style={{ width: "49%", textAlign: "center" }}>
                  已并网
                </Radio.Button>
                <Radio.Button value="1" style={{ width: "49%", textAlign: "center" }}>未并网</Radio.Button>
              </Radio.Group>
            )}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="屋顶使用">
            {form.getFieldDecorator('roof', {
              rules: [{ required: true, message: 'Please input some description...' }],
            })(
              <Radio.Group defaultValue="0" buttonStyle="solid" style={{ width: "100%" }}>
                <Radio.Button value="0" defaultChecked={true} style={{ width: "49%", textAlign: "center" }}>
                  电价优惠
                </Radio.Button>
                <Radio.Button value="1" style={{ width: "49%", textAlign: "center" }} >租赁</Radio.Button>
              </Radio.Group>
            )}
          </FormItem>
        </Col>
      </Row>
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
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const {
      rule: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible } = this.state;

    const columns = [
      {
        title: '站点名称',
        dataIndex: 'no',
      },
      {
        title: '描述',
        dataIndex: 'description',
      },
      {
        title: '站点位置  ',
        dataIndex: 'description',
      },
      {
        title: '建设容量',
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
            <a href="">编辑站点信息</a>
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
      <PageHeaderLayout title="站点列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建站点
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
