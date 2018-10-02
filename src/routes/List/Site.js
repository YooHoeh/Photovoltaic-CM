import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Spin,
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
import { codeToCityName } from '../../utils/utils'

import styles from './Site.less';

const FormItem = Form.Item;
const { Option } = Select;

const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['运行中', '建设中', '建设目标', '告警'];

let positonlabel;
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
    // console.log(values);
  },
})(props => {
  const { modalVisible, form, handleAdd, handleModalVisible, cityList } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      fieldsValue.locaNum = fieldsValue.locaNum[1]
      handleAdd(fieldsValue);
      form.resetFields();
    });
  };
  const handleReset = () => {
    form.resetFields();
  };
  const handleCityChange = (_, position) => {
    const a = position[0].label;
    const b = position[1].label;
    positonlabel = a + '-' + b;
  }
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
              rules: [{ required: true, message: '请输入站点编号' }],
            })(<Input placeholder="请输入" />)}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="站点名称">
            {form.getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入站点名称' }],
            })(<Input placeholder="请输入" />)}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="所属区域">
            {form.getFieldDecorator('locaNum', {
              rules: [{ required: true, message: '请选择区域' }],
            })(
              <Cascader options={cityList} placeholder="选择区域" style={{ width: '100%' }} onChange={handleCityChange} />
            )}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="站点坐标">
            {form.getFieldDecorator('coordinate', {
              rules: [{ required: true, message: '请输入坐标' }],
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
          <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 20 }} label="具体位置">
            {form.getFieldDecorator('location', {
              rules: [{ required: true, message: '请输入站点具体位置' }],
            })(<Input placeholder="请输入" addonBefore={positonlabel} />)}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="设计容量">
            {form.getFieldDecorator('designCount', {
              rules: [{ required: true, message: '请输入站点设计容量' }],
            })(<Input placeholder="请输入" addonAfter="kW" />)}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="建设容量">
            {form.getFieldDecorator('buildCount', {
              rules: [{ required: true, message: '请输入站点建设容量' }],
            })(<Input placeholder="请输入" addonAfter="kW" />)}
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="占地面积">
            {form.getFieldDecorator('area', {
              rules: [{ required: true, message: '请输入占地面积' }],
            })(<Input placeholder="请输入" addonAfter="㎡" />)}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="运行状态">
            {form.getFieldDecorator('runState', {
              rules: [{ required: true, message: '请选择运行状态' }],
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
              rules: [{ required: true, message: '请选择并网状态' }],
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
              rules: [{ required: true, message: '请选择屋顶使用方式' }],
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
  isUpdate: loading.effects['user/fetchSiteList']
}))
@Form.create()
export default class TableList extends PureComponent {

  state = {
    isUpdate: this.props.isUpdate,
    modalVisible: false,
    fields: {
      id: {
        value: '',
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
  componentWillReceiveProps() {
    if (this.state.isUpdate) {
      const { dispatch } = this.props;
      dispatch({
        type: 'rule/fetchSiteList'
      })
    }

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
    // e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };
      dispatch({
        type: 'rule/siteListSearch',
        payload: {
          city: values.position[1],
          status: values.status
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
  deleSite = (val) => {
    const name = val.target.name
    const confirmChange = () => {
      console.log(name)
      const { dispatch } = this.props;
      dispatch({
        type: 'rule/delSite',
        payload: {
          id: name
        }
      });
      dispatch({
        type: 'rule/fetchSiteList',
      });
    }
    Modal.confirm({
      title: '删除站点',
      onOk: confirmChange,
      cancelText: '取消',
      okText: '确认',
      content: `确认删除站点：${name}  吗？此操作无法撤销！`
    });
  }
  render() {
    const {
      rule: { siteList, cityList }
    } = this.props;
    const handleAdd = (value) => {
      console.log(value);

      const { dispatch } = this.props;
      dispatch({
        type: 'rule/addSite',
        payload: value
      })
      dispatch({
        type: 'rule/fetchSiteList',
      });
    }
    const { modalVisible } = this.state;
    const columns = [
      {
        title: '站点ID',
        dataIndex: 'id',
      },
      {
        title: '站点名称',
        dataIndex: 'name',
      },
      {
        title: '所属区域',
        dataIndex: 'city',
        render: val => codeToCityName(val)
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
        render: (val) => (
          <span>
            <a href="">编辑信息</a>
            <Divider type="vertical" />
            <a href="javascript:" name={val.id} onClick={this.deleSite.bind(this)}>删除</a>
          </span>
        ),
      },
    ];
    const parentMethods = {
      handleModalVisible: this.handleModalVisible,
      fields: this.state.fields,
      cityList,
      handleAdd,
    };

    return (
      <PageHeaderLayout title="站点列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm(cityList)} </div>
            {
              siteList
                ? <Table columns={columns} dataSource={siteList} onChange={this.onTableChange} />
                : <Spin tip="等待数据" size="middle" style={{ display: "flex", alignItems: "center", justifyContent: "center", lineHeight: "calc(40vh)" }} />
            }
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} onChange={this.handleFormChange} />
      </PageHeaderLayout>
    );
  }
}
