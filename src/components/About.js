import React from "react";
import { Layout, Typography } from "antd";
const { Content} = Layout;

class About extends React.Component {  
 
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
          This is a website to help you plan yoru trip.<br /><br />
          <br /><br />
          It is designed to only used for travelling to internation alpha cities. <br /><br />
          <br /><br />
          The webpage is still under construction. <br /><br />
          <br /><br />
          You can only enjoy a trip to Los Angeles. <br /><br />
          </Typography.Title>
        </Content>
    );
  }
}

export default About;
