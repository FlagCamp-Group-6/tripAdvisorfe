import React, {Component} from 'react';
import { Layout, Menu, Dropdown, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import tripadvisor_logo from '../images/owl-bird-eyes-eagle-owl-86596.jpeg';
import Login from "./Login";
import Logo  from '../assets/icons/Logo.svg';

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
            <Header style={{ display: "flex", justifyContent: "justify", height:"75px"}}>
               <img src={Logo} className="logo" alt="icon" />

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