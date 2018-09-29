import React, { PureComponent } from 'react';
import { Menu, Icon, Spin, Dropdown, Divider, Tooltip } from 'antd';
import Debounce from 'lodash-decorators/debounce';
import { Link } from 'dva/router';
import styles from './index.less';

export default class GlobalHeader extends PureComponent {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }


  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };

  @Debounce(600)
  triggerResizeEvent() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  render() {
    const {
      currentUser = {},
      collapsed,
      isMobile,
      logo,
      onMenuClick,
    } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="user">
          <Link to="/profile">
            <Icon type="user" />资料修改
          </Link>
        </Menu.Item>
        <Menu.Item key="psk">
          <Icon type="key" />密码修改
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />退出登录
        </Menu.Item>
      </Menu >
    );
    return (
      <div className={styles.header}>
        {isMobile && [
          <img src={logo} alt="logo" width="32" />
          ,
          <Divider type="vertical" key="line" />,
        ]}
        <Icon
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
          style={{ color: '#fff' }}
        />
        <div className={styles.right}>
          <Tooltip title="使用文档">
            <Link to='/help'>
              <Icon type="question-circle-o" style={{ color: '#fff', marginRight: '15px', fontSize: '20px' }} />
            </Link>
          </Tooltip>
          <Tooltip title="告警数量">
            <Link to='/warning'>
              <Icon type="bell" style={{ color: '#fff', marginRight: '10px', fontSize: '20px' }} />
            </Link>
          </Tooltip>
          {currentUser.name ? (
            <Dropdown overlay={menu}>
              <span className={`${styles.action} ${styles.account}`}>
                <span className={styles.name}>{currentUser.name}</span>
              </span>
            </Dropdown>
          ) : (
              <Spin size="small" style={{ marginLeft: 8 }} />
            )}
        </div>
      </div>
    );
  }
}
