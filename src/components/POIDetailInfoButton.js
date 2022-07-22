import React from 'react';
import { Modal, Tooltip, Space, Button, Checkbox } from 'antd';
import { InfoCircleOutlined } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";

class POIDetailInfoButton extends React.Component {
  state = {
    modalVisible: false,
    checked: this.props.POI.used,
  };
 
  openModal = () => {
    this.setState({
      modalVisible: true,
    });
  };
 
  handleCancel = () => {
    this.setState({
      modalVisible: false,
    });
    this.props.change(this.props.POI,this.state.checked);
  };
 
  onChange = (e) => {
    console.log('checked = ', e.target.checked);
    this.setState({
        checked: e.target.checked,
    })
  };

  render() {
    const { POI } = this.props;
    const { id, name, city, description, address, time_taken, used } = POI;
    const { modalVisible } = this.state;
    return (
      <>
        <Tooltip title="View POI Details">
          <Button
            onClick={this.openModal}
            style={{ border: "none" }}
            size="large"
            icon={<InfoCircleOutlined />}
          />
        </Tooltip>
        {modalVisible && (
          <Modal
            title={<h3 className="detailtitle" >{name}
              <Checkbox checked={this.state.checked} onChange={this.onChange}></Checkbox>
            </h3>}
            centered={true}
            visible={modalVisible}
            closable={false}
            footer={null}
            onCancel={this.handleCancel}
          >
            <Space direction="vertical">
                <Text strong={true}>Name</Text>
                <Text type="secondary">{name}</Text>
                <Text strong={true}>City</Text>
                <Text type="secondary">{city}</Text>
                <Text strong={true}>Description</Text>
                <Text type="secondary">{description}</Text>
                <Text strong={true}>Address</Text>
                <Text type="secondary">{address}</Text>
                <Text strong={true}>Time Taken</Text>
                <Text type="secondary">{time_taken}</Text>
            </Space>
          </Modal>
        )}
      </>
    );
  }
}

export default POIDetailInfoButton