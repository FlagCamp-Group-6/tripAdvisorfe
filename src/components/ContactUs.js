import React from "react";
import { Layout, Typography } from "antd";
const { Content} = Layout;

class ContactUs extends React.Component {  
 
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
          You cannot contact us <br />
          <br /><br />
          <br /><br />
          <br /><br />
          <br /><br />
          <br /><br />
          <br /><br />
          <br /><br />
          <br /><br />
          I'm kidding!!!! <br /><br />
          But, we don't provide phone or email... <br /><br />
          Come to find us if you can. <br /><br />
          </Typography.Title>
        </Content>
    );
  }
}

export default ContactUs;
