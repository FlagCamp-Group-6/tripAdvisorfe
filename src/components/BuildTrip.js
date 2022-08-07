import React from 'react';
import { Form, Button, Input, Space, DatePicker, Row } from "antd";
import { HomeOutlined, ScheduleOutlined } from "@ant-design/icons";

class BuildTrip extends React.Component {
    formRef = React.createRef();
    state = {
      loading: false,
    };
   
    onFinish = () => {
      console.log("finish form");
    };
   
    handleSearch = async () => {
      const formInstance = this.formRef.current;
   
      try {
        await formInstance.validateFields();
      } catch (error) {
        return;
      }
      this.props.buildTrip(formInstance.getFieldsValue(true));
    };
   
    render() {
      return (
        <div style={{ width: 900, fontSize: "30px" }}>
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Row>
            <Space>
            <Form.Item 
              name="location"              
              rules={[
                {
                  required: true,
                  message: "Please input your night location!",
                },
              ]}
            >
              <Input
                size="large"
                style={{
                    width: '600px',
                  }}
                disabled={this.state.loading}
                prefix={<HomeOutlined/>}
                placeholder=" Input your night location"
              />
            </Form.Item>

            <Form.Item
              name="beg_date"
              rules={[
                {
                  required: true,
                  message: "Please input your starting date!",
                },
              ]}
            >
              <DatePicker size="large" />
            </Form.Item>
            <Form.Item
              name="end_date"
              rules={[
                {
                  required: true,
                  message: "Please input your ending date!",
                },
              ]}
            >
              <DatePicker size="large"/>
            </Form.Item>
            </Space>
            </Row>
          </Form>
          <Space>
            <Button className="bulid_button"
              onClick={this.handleSearch}
              disabled={this.state.loading}
              shape="round"
              size="large"
            >
            Build
            </Button>
          </Space>
        </div>
      );
    }
}

export default BuildTrip;