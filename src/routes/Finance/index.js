import React from 'react';
import { Card } from "antd";
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
class Finance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {

    return (
      <PageHeaderLayout title="财务管理">
        <Card >
          保留功能，待后期添加
        </Card>
      </PageHeaderLayout>
    )
  }
}
export default Finance;
