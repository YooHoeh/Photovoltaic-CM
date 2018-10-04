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
  Spin,
  Icon,
  message,
  Dropdown,
  Badge,
  Menu,
  Upload,
  Divider,
  Cascader,
  Table,
  Radio,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Inverter.less';

const FormItem = Form.Item;
const { Option } = Select;

const statusMap = ['default', 'processing', 'success', 'error', 'Warning'];
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
      siteID: Form.createFormField({
        value: fields.siteID.value
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
    // console.log(values);
  },
})(props => {
  const { modalVisible, form, handleAdd, handleModalVisible, siteList } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      fieldsValue.siteID = fieldsValue.siteID[2]
      handleAdd(fieldsValue);
      handleModalVisible()
      form.resetFields();
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
      destroyOnClose={true}
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
        {form.getFieldDecorator('siteID', {
          rules: [{ required: true, message: '请选择站点' }],
        })(<Cascader options={siteList} placeholder="选择站点" style={{ width: '100%' }} />)}
      </FormItem>
      <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="逆变器编号">
        {form.getFieldDecorator('id', {
          rules: [{ required: true, message: '请输入逆变器编号' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="机器型号">
        {form.getFieldDecorator('model', {
          rules: [{ required: true, message: '请输入机器型号' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="组串总数">
        {form.getFieldDecorator('mpptNum', {
          rules: [{ required: true, message: '请输入组串总数' }],
        })(
          <Input
            placeholder="请输入"
          />
        )}
      </FormItem>

      <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="支路总数">
        {form.getFieldDecorator('pvNum', {
          rules: [{ required: true, message: '请输入支路总数' }],
        })(
          <Input
            placeholder="请输入"
          />
        )}
      </FormItem>

      <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 16 }} label="协议类型">
        {form.getFieldDecorator('agreement', {
          rules: [{ required: true, message: '' }],
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

@connect(({ rule, loading, chart = {} }) => ({
  rule,
  loading: loading.models.rule,
  siteList: chart.siteListWithPosition

}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    modalVisible: false,
    fields: {
      id: {
        value: '',
      },
      siteID: {
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
      type: 'rule/fetchInverterList',
    });
    dispatch({
      type: 'chart/fetchSiteListWithPosition',
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

      // this.setState({
      //   formValues: values,
      // });

      dispatch({
        type: 'rule/interverListSearch',
        payload: {
          siteID: values.siteID || '',
          position: values.position ? values.position[1] : '',
          status: values.status || '',
        }
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

    const props = {
      name: 'file',
      action: '../public/index/inverters/importEecel',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} 上传成功`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 上传失败.`);
        }
      },
    };

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
                  <Option value="0">待机</Option>
                  <Option value="1">并网</Option>
                  <Option value="2">故障</Option>
                  <Option value="3">关机</Option>
                  <Option value="4">离网</Option>
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
            <Dropdown overlay={
              <Menu >
                <Menu.Item key="import">
                  <Upload {...props}>

                    <Icon type="upload" />从Excel导入
                  </Upload>
                </Menu.Item>
                <Menu.Item key="download">
                  <a href='..\uploads\excel\逆变器上传样本.xlsx'>Excel模板下载</a>
                </Menu.Item>
              </Menu>
            } >
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建逆变器
            </Button>
            </Dropdown>
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
  deleInverter = (val) => {
    const name = val.target.name
    const confirmChange = () => {
      console.log(name)
      const { dispatch } = this.props;
      dispatch({
        type: 'rule/delInverter',
        payload: {
          id: name
        }
      });
      dispatch({
        type: 'rule/fetchInverterList',
      });
    }
    Modal.confirm({
      title: '删除逆变器',
      onOk: confirmChange,
      cancelText: '取消',
      okText: '确认',
      content: `确认删除逆变器：${name}  吗？此操作无法撤销！`
    });
  }
  render() {
    const {
      rule: { inverterList, cityList },
    } = this.props;
    const { modalVisible } = this.state;

    const handleAdd = (value) => {
      console.log(value);

      const { dispatch } = this.props;
      dispatch({
        type: 'rule/addInverter',
        payload: value
      })
      dispatch({
        type: 'rule/fetchInverterList',
      });
    }

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
        sorter: (a, b) => a.mppt_num - b.mppt_num,
        align: 'right',
      },
      {
        title: '光伏支路总数',
        dataIndex: 'pv_num',
        sorter: (a, b) => a.pv_num - b.pv_num,
        align: 'right',
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
          {
            text: status[4],
            value: 4,
          },
        ],
        align: 'right',
        onFilter: (value, record) => record.status.toString() === value,
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />;
        },
      },
      {
        title: '操作',
        align: 'right',
        render: (val) => (
          <Fragment>
            <a href="">编辑信息</a>
            <Divider type="vertical" />
            <a href="javascript:" name={val.sid} onClick={this.deleInverter.bind(this)}>删除</a>
          </Fragment>
        ),
      },
    ];

    const parentMethods = {
      handleModalVisible: this.handleModalVisible,
      fields: this.state.fields,
      siteList: this.props.siteList,
      handleAdd
    };

    return (
      <PageHeaderLayout title="逆变器列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm(cityList)}</div>
            {
              inverterList
                ? <Table columns={columns} dataSource={inverterList} onChange={this.onTableChange} />
                : <Spin tip="等待数据" size="middle" style={{ display: "flex", alignItems: "center", justifyContent: "center", lineHeight: "calc(40vh)" }}
                />
            }
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} onChange={this.handleFormChange} />
      </PageHeaderLayout>
    );
  }
}
