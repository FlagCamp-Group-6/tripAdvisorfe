import React from 'react';
import { Col } from "antd";
import SearchPOI from './SearchPOI';
import Recommendations from './Recommendations'
import DrawPoints from './DrawPoints'

class WhatsHot extends React.Component {
  render() {
    const {POIList,selected}=this.props;
    return (
      <>
      <Col span={13} className="left-side">
          <SearchPOI onShow={this.props.showNearbyPOI} />
          <table height="40px"></table>
          <Recommendations 
        POIList={POIList}
        selected={selected}
        updateSelection={this.props.updateSelection}
      />
      </Col>
      <Col span={6} className="right-side">
          <DrawPoints selected={selected}/>
      </Col>
      </>
    )
  }
}
export default WhatsHot;