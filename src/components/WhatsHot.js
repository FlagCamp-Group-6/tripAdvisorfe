import React from 'react';
import { Col, message, InputNumber, Row, Slider, Typography } from "antd";
import SearchPOI from './SearchPOI';
import Recommendations from './Recommendations'
import DrawPoints from './DrawPoints'
import BuildTrip from './BuildTrip'
import { getPOIByCity, getPOIByName, addPOIToTrip, initTrip, getNewestTripIDByUser, getPlanFromTrip } from '../utils';
const { Title } = Typography;

class WhatsHot extends React.Component {
  constructor() {
    super();
    this.state = {
      POIList: [],
      curShow: [],
      selected: [],
      home: "",
      showmax: 6,
    }
  }

  componentDidMount() {
    this.loadPOI();
  }

  loadPOI = async () => {
    this.setState({
      loading: true,
    });

    try {
      const resp = await getPOIByCity(this.props.city).then((value) => {
        this.setState({
          POIList: value,
        });
        this.firstShowed(value);
      })
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  firstShowed = (input) => {
    let show = [];
    for (let i=0;i<input.length;i++) {
        show[i]=input[i].id;
    }
    console.log(show);
    this.setState({
      curShow: show,
    });
  }

  updatePOI = async (setting) => {
    this.setState({
      loading: true,
    });
    try {
      const POIs = await getPOIByName(setting);
      message.success("Successfully searched POIs");
      const show = this.state.curShow;
      const adding = POIs.length;
      POIs.sort((a, b) => a - b);
      let j=adding-1, x=show.length-1;
      for (let i = show.length-1;i>=0;i--) {
        if (j<0 || j>=0 && show[i]!=POIs[j].id) {
          show[x--]=show[i];
        } else {
          j--;
        }
      }
      for (let i=adding-1;i>=0;i--) {
        show[i]=POIs[i].id;
      }
      this.setState({
        curShow: show,
      })
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  buildTrip = async (setting) => {
    this.setState({
      home: setting.location,
      loading: true,
    });
    var today = new Date();
    var date = (today.getFullYear()-2022)*372+today.getMonth()*31+today.getDate();
    var time = today.getHours()*3600 + today.getMinutes()*60 + today.getSeconds();
    var dateTime = date*86400+time;    
    console.log(dateTime);
    console.log(setting.beg_date);

    try {
      await initTrip(setting.beg_date,setting.end_date,dateTime);
      const resp = await getNewestTripIDByUser().then((value) => {
        console.log(value); 
        this.props.setTrip(value);
        for (var i=0;i<this.state.selected.length;i++) {
          addPOIToTrip(this.state.selected[i].id,value);
        }
        getPlanFromTrip(value);
      });
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  updateSelection = (input) => {
    this.setState({
      selected: input,
    })
  }

  onChange = (newValue) => {
    this.setState({
      showmax: newValue,
    })
  };

  render() {
    return (
      <>
      <Col span={13} className="left-side">
          <SearchPOI onShow={this.updatePOI}/>
          <table height="40px"></table>
          <Row>
          <Col span={4}>
            <InputNumber
              min={1}
              max={20}
              style={{
                margin: '0 16px',
              }}
              value={this.state.showmax}
              onChange={this.onChange}
            />
          </Col>
          <Title level={4}> POIs showing </Title>
          <Col span={12}>
            <Slider
              min={1}
              max={20}
              onChange={this.onChange}
              value={typeof this.state.showmax === 'number' ? this.state.showmax : 0}
            />
          </Col>
        </Row>
          <table height="40px"></table>
          <Recommendations 
        POIList={this.state.POIList}
        selected={this.state.selected}
        showed={this.state.curShow}
        showmax={this.state.showmax}
        updateSelection={this.updateSelection}
      />
      </Col>
      <Col span={11} className="right-side">
          <DrawPoints selected={this.state.selected}/>
          <table height="40px"></table>
          <BuildTrip buildTrip={this.buildTrip}/>
      </Col>
      </>
    )
  }
}
export default WhatsHot;