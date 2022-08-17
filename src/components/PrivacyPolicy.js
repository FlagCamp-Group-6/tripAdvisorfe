import React from "react";
import { Layout, Typography } from "antd";
const { Content} = Layout;

class PrivacyPolicy extends React.Component {  
 
  render() {
    return (
      <Content
        style={{
          padding: '0px 24px',
          minHeight: 1600,
        }}
      >
        <Typography.Title
          level={2}
          style={{
            margin: 0,
          }}
        >
          <br /><br />
          <br /><br />
          You do not have privacy here.<br /><br />
          <br /><br />
          If you have any concern about this, you can use a fake name during registration. <br /><br />
          </Typography.Title>
        </Content>
    );
  }
}

export default PrivacyPolicy;
