import React from 'react';
import { Form, Button, Input, Space, message, Row } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import { searchPOI } from "../utils";

class SearchPOI extends React.Component {
    formRef = React.createRef();
    state = {
      loading: false,
    };
   
    onFinish = () => {
      console.log("finish form");
    };
   
    handleSearch = async (values) => {
      const formInstance = this.formRef.current;
   
      try {
        await formInstance.validateFields();
      } catch (error) {
        return;
      }
   
      this.setState({
        loading: true,
      });
   
      // try {
      //   const POIs = await searchPOI({
      //     place_name: values.location,
      //   });
      //   message.success("Successfully searched POIs");
      //   this.props.onShow(POIs);
      // } catch (error) {
      //   message.error(error.message);
      // } finally {
        this.setState({
          loading: false,
        });
      // }
    };
   
    render() {
      return (
        <div style={{ width: 500}}>
          <Row>
          <Space>
          <Form 
            ref={this.formRef} onFinish={this.onFinish}>
            <Form.Item 
              name="location"
              rules={[
                {
                  required: true,
                  message: "Please input your desired location!",
                },
              ]}
            >
              <Input
                style={{
                  width: 666,
                }}
                size="large"
                disabled={this.state.loading}
                prefix={<EnvironmentOutlined className="site-form-item-icon"/>}
                placeholder="Search your favorite point of interest"
              />
            </Form.Item>
          </Form>
            <Button className="search_button"
              onClick={this.handleSearch}
              disabled={this.state.loading}
              shape="round"
            >
              Find POI
            </Button>
          </Space>
          </Row>
        </div>
      );
    }
  }

  export default SearchPOI;