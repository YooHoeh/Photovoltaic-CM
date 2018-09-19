import React, { PureComponent, Fragment } from 'react';
import { Card, Checkbox, Row, Col, Divider, Input, DatePicker, Button } from "antd";
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
class SystemLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {

    return (
      <PageHeaderLayout title="用户资料">
        <Card >
          写个鸡儿
        </Card>
      </PageHeaderLayout>
    )
  }
}
export default SystemLog;
