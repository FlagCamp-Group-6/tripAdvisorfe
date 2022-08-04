import React from 'react';
import { Col } from "antd";
import SearchPOI from './SearchPOI';
import Recommendations from './Recommendations'
import DrawPoints from './DrawPoints'
import BuildTrip from './BuildTrip'
import { Show } from '@chakra-ui/react';

const showmax=10;

class WhatsHot extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      showed: [],
    }
  }

  componentDidMount() {
    const newShow = [];
    for (let i=0;i<this.props.POIList.length-1 && i<showmax;i++) {
        newShow[i]=this.props.POIList[i].id;
    }
    this.setState({
      showed: newShow,
    })
  }

  showPOI = (POIID) => {
    const newShow = [];
    const {showed} = this.state;
    if (showed.length<showmax) {
      newShow[showed.length]=showed[showed.length-1];
    }
    for (let i=showed.length-1;i>0;i--) {
      newShow[i]=showed[i-1];
    }
    newShow[0]=POIID;
    this.setState({
      showed: newShow,
    });
  }

  render() {
    const {POIList,selected}=this.props;
    return (
      <>
      <Col span={13} className="left-side">
          <SearchPOI onShow={this.showPOI} 
            selected={selected}
            showed={this.state.showed}/>
          <table height="40px"></table>
          <Recommendations 
        POIList={POIList}
        selected={selected}
        showed={this.state.showed}
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