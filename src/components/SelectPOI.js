import React from 'react';
import { Switch, Space} from "antd";

class SelectPOI extends React.Component {

    onChange = (checked) => {
        this.props.change(this.props.POI,checked);
    };

    render() {
        return (
            <Space>
            interested
           <Switch checkedChildren="like" unCheckedChildren="wait" checked={this.props.POI.planned} 
            onChange={this.onChange}/>
          </Space>
        )
    }
}

export default SelectPOI;