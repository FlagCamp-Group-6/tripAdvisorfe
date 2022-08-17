import React from "react";
import { Layout, Typography } from "antd";
const { Content} = Layout;

class TermOfUse extends React.Component {  
 
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
          You are free to use this application. <br /><br />
          <br /><br />
          You are more than welcome to donate though ... <br /><br />
        </Typography.Title>
        </Content>
    );
  }
}

export default TermOfUse;
