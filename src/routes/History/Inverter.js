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
  Divider,/*  */
  Radio,
  TreeSelect
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import  Stacked from "../../components/StackMap";
import styles from './Inverter.less';

@connect(({ rule, loading }) => ({
  rule,
}))
export default class TableList extends PureComponent {
  state = {

  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetch',
    });
  }

  render() {


    return (
      <PageHeaderLayout title="逆变器查询">
        <Card bordered={false} s>
        <Stacked />

        </Card>
      </PageHeaderLayout>
    );
  }
}
