import React, { Fragment } from 'react';
import { Link, Redirect, Switch, Route } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
import GlobalFooter from '../components/GlobalFooter';
import styles from './UserLayout.less';
import logo from '../assets/logo.svg';
import { getRoutes, getPageQuery, getQueryPath } from '../utils/utils';

const links = [
  {
    key: 'help',
    title: '帮助',
    href: '',
  },
  {
    key: 'privacy',
    title: '隐私',
    href: '',
  },
  {
    key: 'terms',
    title: '条款',
    href: '',
  },
];
const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 推荐使用火狐浏览器获取最佳浏览体验
  </Fragment>
);

function getLoginPathWithRedirectPath() {
  const params = getPageQuery();
  const { redirect } = params;
  return getQueryPath('/user/login', {
    redirect,
  });
}

class UserLayout extends React.PureComponent {


  render() {
    const { routerData, match } = this.props;
    return (
      <DocumentTitle title={"用户登录"}>
        <div>

          {/* <div className={styles.login_header}>
            <div className={styles.logo}>
              <img src="..\src\assets\logo.svg" alt="" />
              分布式光伏资产运维管理系统
                    </div>
          </div> */}
          <div className={styles.container}>
            <div className={styles.content}>
              <div className={styles.top}>
                <div className={styles.header}>
                  <Link to="/">
                    <img alt="logo" className={styles.logo} src={logo} />
                    <span className={styles.title}>光伏资产运维管理系统</span>
                  </Link>
                </div>
                <div className={styles.desc}>在线分布式光伏资产运维管理系统</div>
              </div>
              <div className={styles.switch}>
                <Switch>
                  {getRoutes(match.path, routerData).map(item => (
                    <Route
                      key={item.key}
                      path={item.path}
                      component={item.component}
                      exact={item.exact}
                    />
                  ))}
                  <Redirect from="/user" to={getLoginPathWithRedirectPath()} />
                </Switch>
              </div>
            </div>
            {/* <div className={styles.footer}>
              <GlobalFooter links={links} copyright={copyright} className="login_footer" />
            </div> */}
          </div>
        </div>

      </DocumentTitle>
    );
  }
}

export default UserLayout;
