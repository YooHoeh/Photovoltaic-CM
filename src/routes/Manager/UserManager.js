import React, { PureComponent, Fragment } from 'react';
import { Card, Checkbox, Row, Col, Divider, Input, DatePicker, Button } from "antd";
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
class UserManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {

    return (
      <PageHeaderLayout title="用户管理">
        <Card >
        </Card>
      </PageHeaderLayout>
    )
  }
}
export default UserManager;
