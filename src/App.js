import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import Routing from './routes'
import { NavLink } from 'react-router-dom';

const { Header, Sider } = Layout;
const { SubMenu } = Menu;

class App extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout>
        <Header style={{ background: '#fff', padding: 0}}>
          <div>
          <Icon
            className="trigger"
            style={{ fontSize: '30px', color: 'dark' }}
            type={this.state.collapsed ? 'menu' : 'close'}
            onClick={this.toggle}
          />
          <span style={{ position: 'absolute', top: -4, fontSize: '200%'  }}>NUMERICAL METHODS</span>
          </div>
        </Header>
        <Layout>
        <Sider width={300} trigger={null} collapsible collapsed={this.state.collapsed} >
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="right-circle"
                    style={{ fontSize: '20px'}}
                  />
                  <span style={{ position: 'absolute', top: -1 }}>Root of Equation</span>
                </span>
              }
            >
              <Menu.Item key="1"><NavLink to="/bisection">Bisection</NavLink></Menu.Item>
              <Menu.Item key="2"><NavLink to="/falseposition">False Position</NavLink></Menu.Item>
              <Menu.Item key="3"><NavLink to="/onepointiteration">One-Point Iteration</NavLink></Menu.Item>
              <Menu.Item key="4"><NavLink to="/newtonraphson">Newton-Raphson</NavLink></Menu.Item>
              <Menu.Item key="5"><NavLink to="/secantmethod">Secant Method</NavLink></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon className="square" type="right-square"
                    style={{ fontSize: '20px' }}
                  />
                  <span style={{ position: 'absolute', top: -1 }}>Linear Algebra</span>
              </span>
              }
            >
              <Menu.Item key="6"><NavLink to="/cramer">Cramer's Rule</NavLink></Menu.Item>
              <Menu.Item key="7"><NavLink to="/gausseli">Gauss's Elimination</NavLink></Menu.Item>
              <Menu.Item key="8"><NavLink to="/gaussjordan">Gauss Jordan Method</NavLink></Menu.Item>
              <Menu.Item key="9"><NavLink to="/lu">LU Decomposition</NavLink></Menu.Item>
              <Menu.Item key="10"><NavLink to="/jacobi">Jacobi Iteration Method</NavLink></Menu.Item>
              <Menu.Item key="11"><NavLink to="/gaussseidel">Gauss Seidel Iteration</NavLink></Menu.Item>
              <Menu.Item key="12"><NavLink to="/conjugate">Conjugate Gradient Method</NavLink></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={
                <span>
                  <Icon type="right-circle"
                    style={{ fontSize: '20px'}}
                  />
                  <span style={{ position: 'absolute', top: -1 }}>Interpolation</span>
                </span>
              }
            >
              <Menu.Item key="13"><NavLink to="/newtondivide">Newton Divide Difference</NavLink></Menu.Item>
              <Menu.Item key="14"><NavLink to="/lagrange">Lagrange</NavLink></Menu.Item>
              <Menu.Item key="15"><NavLink to="/spline">Spline</NavLink></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4"
              title={
                <span>
                  <Icon className="square" type="right-square"
                    style={{ fontSize: '20px' }}
                  />
                  <span style={{ position: 'absolute', top: -1 }}>Least Square Error</span>
              </span>
              }
            >
              <Menu.Item key="16"><NavLink to="/linear">Linear Regression</NavLink></Menu.Item>
              <Menu.Item key="17"><NavLink to="/polynomial">Polynomial Regression</NavLink></Menu.Item>
              <Menu.Item key="18"><NavLink to="/multiple">Multiple Linear Regression</NavLink></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub5"
              title={
                <span>
                  <Icon type="right-circle"
                    style={{ fontSize: '20px'}}
                  />
                  <span style={{ position: 'absolute', top: -1 }}>Integration</span>
                </span>
              }
            >
              <Menu.Item key="19"><NavLink to="/trapezoidal">Composite Trapezoidal Rule</NavLink></Menu.Item>
              <Menu.Item key="20"><NavLink to="/simpson">Composite Simpson's Rule</NavLink></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub6"
              title={
                <span>
                  <Icon className="square" type="right-square"
                    style={{ fontSize: '20px' }}
                  />
                  <span style={{ position: 'absolute', top: -1 }}>Derivative</span>
              </span>
              }
            >
              <Menu.Item key="21"><NavLink to="/fwh">FW O(h)</NavLink></Menu.Item>
              <Menu.Item key="22"><NavLink to="/bwh">BW O(h)</NavLink></Menu.Item>
              <Menu.Item key="23"><NavLink to="/fwh2">FW O(h<sup>2</sup>)</NavLink></Menu.Item>
              <Menu.Item key="24"><NavLink to="/bwh2">BW O(h<sup>2</sup>)</NavLink></Menu.Item>
              <Menu.Item key="25"><NavLink to="/oh2">O(h<sup>2</sup>)</NavLink></Menu.Item>
              <Menu.Item key="26"><NavLink to="/oh4">O(h<sup>4</sup>)</NavLink></Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout><Routing /></Layout>
        </Layout>
      </Layout>
    );
  }
}


export default App