import React from 'react';
import { Space, Button } from "antd";

class SelectPOI extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            planned: this.props.planned,
        }
      }
    onClick1 = () => {
        this.setState({
            planned: true,
        });
        this.props.change(this.props.POI,true);
    };
    onClick2 = () => {
        this.setState({
            planned: false,
        });
        this.props.change(this.props.POI,false);
    };
    render() {
        return (
            <Space>
            {!this.state.planned && (
                <Button onClick={this.onClick1.bind(this)} shape="round" type="primary"> Add to trip </Button>
            )}
            {this.state.planned && (
                <Button onClick={this.onClick2.bind(this)} shape="round" type="ghost"> Delete from trip</Button>
            )}
            </Space>
        )
    }
}

export default SelectPOI;