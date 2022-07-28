import { Layout } from "antd";
import React from "react";
import PageHeader from './PageHeader';
import Main from './Main';
import PageFooter from './PageFooter';
import HomePage from "./HomePage";

const { Content } = Layout;
 
class App extends React.Component {
  state = {
    city: 0,
    authed: false,
  };

  componentDidMount() {
    const authToken = localStorage.getItem("authToken");
    this.setState({
      authed: authToken !== null,
    });
    this.setState({
      authed: true,
    });
  };
 
  handleLoginSuccess = (token) => {
    localStorage.setItem("authToken", token);
    this.setState({
      authed: true,
    });
  };
 
  handleLogOut = () => {
    localStorage.removeItem("authToken");
    this.setState({
      authed: false,
    });
  };
 
  handleSelection = (value) => {
    this.setState({
      city: value,
    });
  };

  renderContent = () => {
    if (this.state.authed && this.state.city===2) {
       return <Main />;
    }
 
    return <HomePage handleSelection={this.handleSelection} />;
  };
 
  render() {
    return (
        <Layout>
        <PageHeader auth={this.state.authed} handleLogOut={this.handleLogOut} handleLoginSuccess={this.handleLoginSuccess} />
        <Content
          style={{ height: "calc(100% - 64px)", margin: 20, overflow: "auto" }}
        >
          {this.renderContent()}
        </Content>
        </Layout>
        
    );
  }
}

export default App;
