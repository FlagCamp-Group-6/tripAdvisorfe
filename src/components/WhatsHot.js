import React from 'react';
import { Col } from "antd";
import SearchPOI from './SearchPOI';
import Recommendations from './Recommendations'
import DrawPoints from './DrawPoints'
import BuildTrip from './BuildTrip'

class WhatsHot extends React.Component {
  
  render() {
    const {POIList,selected,showed}=this.props;
    return (
      <>
      <Col span={13} className="left-side">
          <SearchPOI onShow={this.props.updatePOI}/>
          <table height="40px"></table>
          <Recommendations 
        POIList={POIList}
        selected={selected}
        showed={showed}
        updateSelection={this.props.updateSelection}
      />
      </Col>
      <Col span={9} className="right-side">
          <DrawPoints selected={selected}/>
          <table height="40px"></table>
          <BuildTrip buildTrip={this.props.buildTrip}/>
      </Col>
      </>
    )
  }
}
export default WhatsHot;