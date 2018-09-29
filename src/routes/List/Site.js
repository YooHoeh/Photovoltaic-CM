import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Modal,
  Cascader,
  Radio,
  Badge,
  Divider,
  Table,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Site.less';

const FormItem = Form.Item;
const { Option } = Select;

const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['运行中', '建设中', '建设目标', '告警'];

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
      name: Form.createFormField({
        value: fields.name.value
      }),
      locaNum: Form.createFormField({
        value: fields.locaNum.value
      }),
      coordinate: Form.createFormField({
        value: fields.coordinate.value
      }),
      location: Form.createFormField({
        value: fields.location.value
      }),
      designCount: Form.createFormField({
        value: fields.designCount.value
      }),
      buildCount: Form.createFormField({
        value: fields.buildCount.value
      }),
      area: Form.createFormField({
        value: fields.area.value
      }),
      runState: Form.createFormField({
        value: fields.runState.value
      }),
      netState: Form.createFormField({
        value: fields.netState.value
      }),
      roof: Form.createFormField({
        value: fields.roof.value
      }),
    };
  },
  onValuesChange(_, values) {
    console.log(values);
  },
})(props => {
  const { modalVisible, form, handleAdd, handleModalVisible, cityList } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      console.log(fieldsValue)
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
            {form.getFieldDecorator('name', {
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
              <Cascader options={cityList} placeholder="选择区域" style={{ width: '100%' }} />
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
            {form.getFieldDecorator('area', {
              rules: [{ required: true, message: 'Please input some description...' }],
            })(<Input placeholder="请输入" addonAfter="㎡" />)}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="运行状态">
            {form.getFieldDecorator('runState', {
              rules: [{ required: true, message: 'Please input some description...' }],
            })(
              <Radio.Group buttonStyle="solid">
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
              <Radio.Group buttonStyle="solid" style={{ width: "100%" }}>
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
              <Radio.Group buttonStyle="solid" style={{ width: "100%" }}>
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
    fields: {
      id: {
        value: '11234567',
      },
      name: {
        value: '',
      },
      locaNum: {
        value: '',
      },
      coordinate: {
        value: '',
      },
      location: {
        value: '',
      },
      designCount: {
        value: '',
      },
      buildCount: {
        value: '',
      },
      area: {
        value: '',
      },
      runState: {
        value: '1',
      },
      netState: {
        value: '1',
      },
      roof: {
        value: '0',
      }
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetchSiteList',
    });

  }
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();

    dispatch({
      type: 'rule/fetchSiteList',
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
        type: 'rule/fetchSiteList',
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
          <Col md={6} sm={24}>
            <FormItem label="所在区域">
              {getFieldDecorator('position')(<Cascader options={cityList} placeholder="选择区域" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="运行使用状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                  <Option value="2">建设目标</Option>
                  <Option value="3">告警</Option>
                </Select>
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
          <Col md={2} sm={24} offset={3}>
            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
              新建站点
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
      rule: { siteList, cityList }
    } = this.props;
    const { modalVisible } = this.state;
    const columns = [
      {
        title: '站点名称',
        dataIndex: 'name',
      },
      {
        title: '所属区域',
        dataIndex: 'city',
      },
      {
        title: '站点位置  ',
        dataIndex: 'location',
      },
      {
        title: '建设容量',
        dataIndex: 'buildContain',
        sorter: true,
        align: 'right',
        render: val => `${val} 千`,
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
        align: 'right',
        render: () => (
          <span>
            <a href="">编辑站点信息</a>
            <Divider type="vertical" />
            <a href="">删除</a>
          </span>
        ),
      },
    ];
    const parentMethods = {
      handleModalVisible: this.handleModalVisible,
      fields: this.state.fields,
      cityList,
    };

    return (
      <PageHeaderLayout title="站点列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm(cityList)} </div>
            <Table columns={columns} dataSource={siteList} onChange={this.onTableChange} />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} onChange={this.handleFormChange} />
      </PageHeaderLayout>
    );
  }
}
