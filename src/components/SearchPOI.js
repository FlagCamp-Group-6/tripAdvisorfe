import React from 'react';
import { Form, Button, Input, Space, DatePicker, message, Row } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import { search } from "../utils";

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
   
      try {
        await search({
          beg_date: values.beg_date.format("YYYY-MM-DD"),
          end_date: values.end_date.format("YYYY-MM-DD"),
          place_name: values.Location,
        });
        message.success("Successfully searched POI");
        this.props.onShow(values);
      } catch (error) {
        message.error(error.message);
      } finally {
        this.setState({
          loading: false,
        });
      }
    };
   
    render() {
      return (
        <div style={{ width: 500}}>
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Row>
            <Space>
            <Form.Item 
              name="Location"
              rules={[
                {
                  required: true,
                  message: "Please input your desired location!",
                },
              ]}
            >
              <Input
                disabled={this.state.loading}
                prefix={<EnvironmentOutlined className="site-form-item-icon" />}
                placeholder="Search your favorite point of interest"
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
              <DatePicker />
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
              <DatePicker />
            </Form.Item>
            </Space>
            </Row>
          </Form>
          <Space>
            <Button className="search_button"
              onClick={this.handleSearch}
              disabled={this.state.loading}
              shape="round"
            >
              Search
            </Button>
          </Space>
        </div>
      );
    }
  }

  export default SearchPOI;