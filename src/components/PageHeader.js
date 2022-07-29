import React, {Component} from 'react';
import { Layout, Menu, Dropdown, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import tripadvisor_logo from '../images/owl-bird-eyes-eagle-owl-86596.jpeg';
import Login from "./Login";

const { Header } = Layout;

class PageHeader extends Component {

    userMenuOut = (
        <Menu>
          <Menu.Item key="logout" onClick={this.props.handleLogOut}>
            Log Out
          </Menu.Item>
        </Menu>
      );
    render() {
        return (
            <Header style={{ display: "flex", justifyContent: "space-between", height:"80px"}}>
                <img alt="logo" src={tripadvisor_logo} width="200" height="80"/> 
                <div>
            <span style={{ fontSize: 30, fontWeight: 600, color: "white"}}>
              Trip Advisor </span> 
              <span style={{ fontSize: 18, fontWeight: 600, color: "cyan"}}> The official travel site of the USA </span>
            </div>
            {this.props.auth && (
              <div>
                <Dropdown trigger="click" overlay={this.userMenuOut}>
                  <Button icon={<UserOutlined />} shape="circle" size="large"/>
                </Dropdown>
              </div>
            )}
            {!this.props.auth && (
              <div>
                <Login handleLoginSuccess={this.props.handleLoginSuccess}/>
              </div> 
            )}
          </Header>
        );
    }
}

export default PageHeader