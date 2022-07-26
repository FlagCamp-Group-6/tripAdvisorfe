import React from "react";
import { Layout, Row, Typography } from "antd";
import WhatsHot from './WhatsHot'
import PlanTrip from './PlanTrip'
import ManageTrip from './ManageTrip'
import whats_hot from '../assets/icons/whats_hot.svg';
import plan_trip from '../assets/icons/plan_trip.svg';
import manage_trip from '../assets/icons/manage_trip.svg';

const { Sider, Content} = Layout;

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      activetab: 1,
      curTrip: -1,
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

  setTrip = (tripid) => {
    this.setState({
      curTrip: tripid,
    })
  }

  modifyTrip = (tripid) => {
    console.log("modify trip");
    this.setTrip(tripid);
    this.setTab2();
  }

  render() {
    const { curTrip, POIList, curShow } = this.state;

    return (
      <Layout
        style={{
          padding: '24px 0',
        }}
      >
        <Sider className="site-layout-background" width={100}>
          <div className = "sidebar">
            {this.state.activetab === 1 && (
              <div className="optionselected">
                <img src={whats_hot} className="Nav_01" alt="icon" />
                <Typography.Title
                level={3}
                style={{ margin: 0 }}>
                What's Hot
              </Typography.Title>
              </div>
            )}
            {this.state.activetab !== 1 && (
              <div className="option" onClick={this.setTab1.bind(this)}>
                <img src={whats_hot} className="Nav_01" alt="icon" />
                <Typography.Title
                type="secondary"
                level={3}
                style={{ margin: 0 }}>
                What's Hot
              </Typography.Title>
              </div>
            )}
            {this.state.activetab === 2 && (
              <div className="optionselected">
                <img src={plan_trip} className="Nav_02" alt="icon" />
                <Typography.Title
                level={3}
                style={{ margin: 0 }}>
                Plan My Trip
              </Typography.Title>
              </div>
            )}
            {this.state.activetab !== 2 && (
              <div className="option" onClick={this.setTab2.bind(this)}>
                <img src={plan_trip} className="Nav_02" alt="icon" />
                <Typography.Title
                type="secondary"
                level={3}
                style={{ margin: 0 }}>
                Plan My Trip
              </Typography.Title>
              </div>
            )}
            {this.state.activetab === 3 && (
              <div className="optionselected">
                <img src={manage_trip} className="Nav_03" alt="icon" />
                <Typography.Title
                level={3}
                style={{ margin: 0 }}>
                Manage Trip
              </Typography.Title>
              </div>
            )}
            {this.state.activetab !== 3 && (
              <div className="option" onClick={this.setTab3.bind(this)}>
                <img src={manage_trip} className="Nav_03" alt="icon" />
                <Typography.Title
                type="secondary"
                level={3}
                style={{ margin: 0 }}>
                Manage Trip
              </Typography.Title>
              </div>
            )}
            </div>
        </Sider>
        <Content
          style={{
            padding: '0px 24px',
            minHeight: 1600,
          }}
        >
          <Row className="main">
            {this.state.activetab===1 && (
              <WhatsHot city={this.props.city} setTrip={this.setTrip}/>
            )}
            {this.state.activetab===2 && (
              <PlanTrip curTrip={curTrip} setTrip={this.setTrip}/>
            )}
            {this.state.activetab===3 && (
              <ManageTrip modifyTrip={this.modifyTrip}/>
            )}
          </Row>
        </Content>
      </Layout>
    );
  }
}

export default Main;