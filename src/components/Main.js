import React from "react";
import { Layout, Row, Typography, Space, message } from "antd";
import WhatsHot from './WhatsHot'
import PlanTrip from './PlanTrip'
import ManageTrip from './ManageTrip'
import whats_hot from '../assets/icons/whats_hot.svg';
import plan_trip from '../assets/icons/plan_trip.svg';
import manage_trip from '../assets/icons/manage_trip.svg';
import { getPOIByCity, getPOIByName, addPOIToTrip, initTrip, getNewestTripIDByUser, getPlanFromTrip } from '../utils';

const { Sider, Content} = Layout;
const showmax=6;

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      activetab: 1,
      POIList: [],
      selected: [],
      beg_date: null,
      end_date: null,
      home: "",
      curTrip: -1,
      curShow: [],
    }
  }
  setTab1() {
    this.setState({
      activetab: 1,
    });
  }
  setTab2() {
    this.setState({
      activetab: 2,
    });
  }
  setTab3() {
    this.setState({
      activetab: 3,
    });
  }

  componentDidMount() {
    this.loadPOI();
  }

  loadPOI = async () => {
    this.setState({
      loading: true,
    });

    try {
      const resp = await getPOIByCity(this.props.city);
      this.setState({
        POIList: resp,
      });
      this.firstShowed(resp);
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
    // this.firstShowed(resp);
  };

  firstShowed = (input) => {
    let show = [];
    for (let i=0;i<input.length && i<showmax;i++) {
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
      for (let i=show.length-1;i>=adding;i--) {
        show[i]=show[i-adding];
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
      beg_date: setting.beg_date,
      end_date: setting.end_date,
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
        this.setState({
          curTrip: value,
        })
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

  render() {
    const { POIList, selected, beg_date, end_date, curShow, curTrip } = this.state;

    return (
      <Layout
        style={{
          padding: '24px 0',
        }}
      >
        <Sider className="site-layout-background" width={100}>
          <Space direction='vertical'>
            {this.state.activetab === 1 && (
              <>
                <div className="optionselected">
                  <img src={whats_hot} className="Nav_01" alt="icon" />
                </div>
                <Typography.Title
                  level={3}
                  style={{ margin: 0 }}>
                  What's Hot
                </Typography.Title>
              </>
            )}
            {this.state.activetab !== 1 && (
              <>
                <div className="option" onClick={this.setTab1.bind(this)}>
                  <img src={whats_hot} className="Nav_01" alt="icon" />
                </div>
                <Typography.Title
                  type="secondary"
                  level={3}
                  style={{ margin: 0 }}>
                  What's Hot
                </Typography.Title>
              </>
            )}
            {this.state.activetab === 2 && (
              <>
                <div className="optionselected">
                  <img src={plan_trip} className="Nav_02" alt="icon" />
                </div>
                <Typography.Title
                  level={3}
                  style={{ margin: 0 }}>
                  Plan My Trip
                </Typography.Title>
              </>
            )}
            {this.state.activetab !== 2 && (
              <>
                <div className="option" onClick={this.setTab2.bind(this)}>
                  <img src={plan_trip} className="Nav_02" alt="icon" />
                </div>
                <Typography.Title
                  type="secondary"
                  level={3}
                  style={{ margin: 0 }}>
                  Plan My Trip
                </Typography.Title>
              </>
            )}
            {this.state.activetab === 3 && (
              <>
                <div className="optionselected">
                  <img src={manage_trip} className="Nav_03" alt="icon" />
                </div>
                <Typography.Title
                  level={3}
                  style={{ margin: 0 }}>
                  Manage Trip
                </Typography.Title>
              </>
            )}
            {this.state.activetab !== 3 && (
              <>
                <div className="option" onClick={this.setTab3.bind(this)}>
                  <img src={manage_trip} className="Nav_03" alt="icon" />
                </div>
                <Typography.Title
                  type="secondary"
                  level={3}
                  style={{ margin: 0 }}>
                  Manage Trip
                </Typography.Title>
              </>
            )}
          </Space>
        </Sider>
        <Content
          style={{
            padding: '0px 24px',
            minHeight: 2000,
          }}
        >
          <Row className="main">
            {this.state.activetab===1 && (
            <WhatsHot POIList={POIList} selected={selected} showed={curShow} 
            updatePOI={this.updatePOI} updateSelection={this.updateSelection} buildTrip={this.buildTrip} addTrip={this.addTrip}/>
            )}
            {this.state.activetab===2 && (
                // <PlanTrip selected={selected} beg_date={beg_date} end_date={end_date} curTrip={curTrip}/>
                <PlanTrip curTrip={curTrip}/>
            )}
            {this.state.activetab===3 && (
                <ManageTrip />
            )}
          </Row>
        </Content>
      </Layout>
    );
  }
}

export default Main;