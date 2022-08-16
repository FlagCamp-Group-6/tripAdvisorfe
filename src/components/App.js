import { Layout } from "antd";
import React from "react";
import PageHeader from './PageHeader';
import Main from './Main';
import PageFooter from './PageFooter';
import HomePage from "./HomePage";
import { Routes, Route } from "react-router-dom";
import ContactUs from "./ContactUs";
import About from "./About";
import TermOfUse from "./TermOfUse";
import PrivacyPolicy from "./PrivacyPolicy";

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
       return <Main city={this.state.city}/>;
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
            <Routes>
            <Route path="/" element={this.renderContent()} /> 
            <Route path="about" element={<About />} />
            <Route path="contactus" element={<ContactUs />} />
            <Route path="termofuse" element={<TermOfUse />} />
            <Route path="privacypolicy" element={<PrivacyPolicy />} />
        </Routes>
        </Content>
        <PageFooter />
        </Layout>
        
    );
  }
}

export default App;
