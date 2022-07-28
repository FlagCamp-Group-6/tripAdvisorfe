import React from "react";
import { Layout, Row, Typography, Space } from "antd";
import { FireOutlined, CalendarOutlined, FileTextOutlined } from '@ant-design/icons';
import WhatsHot from './WhatsHot'
import PlanTrip from './PlanTrip'
import ManageTrip from './ManageTrip'

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
        <Sider className="site-layout-background" width={200}>
          <Space direction="vertical"
          size="middle"
          style={{
          display: 'flex',
          }}>
          {this.state.activetab===1 && (
            <>
            <div className="optionselected">
            </div>
              <Typography.Title
              level={3}
              style={{margin: 0,color: "white"}}>
              <FireOutlined />
              What's Hot
              </Typography.Title>
              </>
          )}
          {this.state.activetab!==1 && (
            <>
        <div className="option" onClick={this.setTab1.bind(this)}> 
        </div>
            <Typography.Title
            level={3}
            style={{margin: 0,color: "white"}}>
            <FireOutlined />
            What's Hot
            </Typography.Title>
            </>
         )}
        {this.state.activetab===2 && (
          <>
            <div className="optionselected">
            </div>
              <Typography.Title
              level={3}
              style={{margin: 0,color: "white"}}>
              <CalendarOutlined/>
              Plan My Trip
              </Typography.Title>
              </>
          )}
        {this.state.activetab!==2 && (
          <>
        <div className="option" onClick={this.setTab2.bind(this)}> 
        </div>
            <Typography.Title
            level={3}
            style={{margin: 0,color: "white"}}>
            <CalendarOutlined/>
            Plan My Trip
            </Typography.Title>
            </>
        )}
        {this.state.activetab===3 && (
          <>
            <div className="optionselected">
            </div>
              <Typography.Title
              level={3}
              style={{margin: 0,color: "white"}}>
                <FileTextOutlined/>
              Manage Trip
              </Typography.Title>
              </>
          )}
        {this.state.activetab!==3 && (
        <>
        <div className="option" onClick={this.setTab3.bind(this)}> 
        </div>
            <Typography.Title
            level={3}
            style={{margin: 0,color: "white"}}>
              <FileTextOutlined/>
            Manage Trip
            </Typography.Title>
            </>
        )}
        </Space>
        </Sider>
        <Content
          style={{
            padding: '0px 24px',
            minHeight: 1200,
          }}
        >
            <Row className='main'>
              {this.state.activetab===1 && (
              <WhatsHot POIList={POIList} selected={selected} updateSelection={this.updateSelection} oshotNearbyPOI={this.showNearbyPOI}/>
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