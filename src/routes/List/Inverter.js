import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Button,
  Modal,
  message,
  Badge,
  Divider,
  Cascader,
  Table,
  Radio,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Inverter.less';

const FormItem = Form.Item;
const { Option } = Select;

const statusMap = ['default', 'processing', 'success', 'error'];
const status = ["待机", "并网", "故障", "关机", "离网"];

const CreateForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },

  mapPropsToFields(props) {
    const fields = props.fields;
    return {
      id: Form.createFormField({
        value: fields.id.value
      }),
      site: Form.createFormField({
        value: fields.site.value
      }),
      model: Form.createFormField({
        value: fields.model.value
      }),
      agreement: Form.createFormField({
        value: fields.agreement.value
      }),
      mpptNum: Form.createFormField({
        value: fields.mpptNum.value
      }),
      pvNum: Form.createFormField({
        value: fields.pvNum.value
      }),
    };
  },
  onValuesChange(_, values) {
    console.log(values);
  },
})(props => {
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
      width="450px"
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
      <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="所属站点">
        {form.getFieldDecorator('site', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(<Select></Select>)}
      </FormItem>
      <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="逆变器编号">
        {form.getFieldDecorator('id', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="机器型号">
        {form.getFieldDecorator('model', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="组串总数">
        {form.getFieldDecorator('mpptNum', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(
          <Input
            placeholder="请输入"
          />
        )}
      </FormItem>

      <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="支路总数">
        {form.getFieldDecorator('pvNum', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(
          <Input
            placeholder="请输入"
          />
        )}
      </FormItem>

      <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 16 }} label="协议类型">
        {form.getFieldDecorator('agreement', {
          rules: [{ required: true, message: 'Please input some description...' }],
          initialValue: "0"
        })(
          <Radio.Group buttonStyle="solid">
            <Radio.Button value="0" >
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
    fields: {
      id: {
        value: '11234567',
      },
      site: {
        value: '',
      },
      model: {
        value: '',
      },
      serial: {
        value: '',
      },
      agreement: {
        value: '0',
      },
      mpptNum: {
        value: '',
      },
      pvNum: {
        value: '',
      },
    }
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetch',
    });
    dispatch({
      type: 'rule/fetchInverterList',
    });

  }


  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();

    dispatch({
      type: 'rule/fetchInverterList',
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


  renderSimpleForm(cityList) {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={4} sm={24}>
            <FormItem label="站点编号">
              {getFieldDecorator('siteID')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="所在区域">
              {getFieldDecorator('position')(
                <Cascader options={cityList} placeholder="选择区域" />
              )}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="运行状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
          <Col md={2} sm={24} offset={5}>
            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
              新建逆变器
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
  handleFormChange = (changedFields) => {
    this.setState(({ fields }) => ({
      fields: { ...fields, ...changedFields },
    }));
  }
  onTableChange = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
  }
  render() {
    const {
      rule: { inverterList, cityList },
    } = this.props;
    const { modalVisible } = this.state;

    const columns = [
      {
        title: '机器型号',
        dataIndex: 'model',
      },
      {
        title: '站点编号',
        dataIndex: 'sid',
      },
      {
        title: '光伏组串总数',
        dataIndex: 'mppt_num',
        sorter: true,
        align: 'right',
        render: val => `${val} 千`,
      },
      {
        title: '光伏支路总数',
        dataIndex: 'pv_num',
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
            <a href="">删除</a>
          </Fragment>
        ),
      },
    ];

    const parentMethods = {
      handleModalVisible: this.handleModalVisible,
      fields: this.state.fields,
      cityList,
    };

    return (
      <PageHeaderLayout title="逆变器列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm(cityList)}</div>
            <Table columns={columns} dataSource={inverterList} onChange={this.onTableChange} />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} onChange={this.handleFormChange} />
      </PageHeaderLayout>
    );
  }
}
