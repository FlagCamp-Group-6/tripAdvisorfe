import React from "react";
import { Layout, Row, Typography, Space } from "antd";
import WhatsHot from './WhatsHot'
import PlanTrip from './PlanTrip'
import ManageTrip from './ManageTrip'
import whats_hot  from '../assets/icons/whats_hot.svg';
import plan_trip  from '../assets/icons/plan_trip.svg';
import manage_trip  from '../assets/icons/manage_trip.svg';

const { Sider, Content} = Layout;

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
        activetab: 1,
        POIList: [],
        selected: [],
        beg_date: null,
        end_date: null,
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
  showNearbyPOI = (setting) => {
    this.fetchPOI(setting);
  }

  fetchPOI = (setting) => {
    this.setState({
      isLoading: true,
      beg_date: setting.beg_date.format("YYYY-MM-DD"),
      end_date: setting.end_date.format("YYYY-MM-DD"),
    });
  }

  updateSelection = (input) => {
    this.setState({
      selected:input,
    })
  }

  render() {
    const { POIList,selected,beg_date,end_date } = this.state;

    return (
      <Layout
        className="site-layout-background"
        style={{
          padding: '24px 0',
        }}
      >
        <Sider className="site-layout-background" width={100}>
          {this.state.activetab===1 && (
            <>
            <div className="optionselected">
            <img src={whats_hot} className="Nav_01" alt="icon" />
            </div>
              <Typography.Title
              level={3}
              style={{margin: 0}}>
              What's Hot
              </Typography.Title>
              </>
          )}
          {this.state.activetab!==1 && (
            <>
        <div className="option" onClick={this.setTab1.bind(this)}> 
        <img src={whats_hot} className="Nav_01" alt="icon" />
        </div>
            <Typography.Title
            level={3}
            style={{margin: 0}}>
            What's Hot
            </Typography.Title>
            </>
         )}
        {this.state.activetab===2 && (
          <>
            <div className="optionselected">
            <img src={plan_trip} className="Nav_02" alt="icon" />
            </div>
              <Typography.Title
              level={3}
              style={{margin: 0}}>
              Plan My Trip
              </Typography.Title>
              </>
          )}
        {this.state.activetab!==2 && (
          <>
        <div className="option" onClick={this.setTab2.bind(this)}> 
        <img src={plan_trip} className="Nav_02" alt="icon" />
        </div>
            <Typography.Title
            level={3}
            style={{margin: 0}}>
            Plan My Trip
            </Typography.Title>
            </>
        )}
        {this.state.activetab===3 && (
          <>
            <div className="optionselected">
            <img src={manage_trip} className="Nav_03" alt="icon" />
            </div>
              <Typography.Title
              level={3}
              style={{margin: 0}}>
              Manage Trip
              </Typography.Title>
              </>
          )}
        {this.state.activetab!==3 && (
        <>
        <div className="option" onClick={this.setTab3.bind(this)}> 
        <img src={manage_trip} className="Nav_03" alt="icon" />
        </div>
            <Typography.Title
            level={3}
            style={{margin: 0}}>
            Manage Trip
            </Typography.Title>
            </>
        )}
        </Sider>
        <Content
          style={{
            padding: '0px 24px',
            minHeight: 1200,
          }}
        >
            <Row className='main'>
              {this.state.activetab===1 && (
              <WhatsHot POIList={POIList} selected={selected} updateSelection={this.updateSelection} showNearbyPOI={this.showNearbyPOI}/>
              )}
              {this.state.activetab===2 && (
                  <PlanTrip selected={selected}/>
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