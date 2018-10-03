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
        <Card style={{ textAlign: 'center' }}>
          <p>
            针对发电量和并网情况显示指定时间段指定站点的财务报表信息
          </p>
          <p>
            此功能为预留功能
          </p>
        </Card>
      </PageHeaderLayout>
    )
  }
}
export default Finance;
