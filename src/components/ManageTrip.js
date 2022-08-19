import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table, Timeline, Col, Button, Row, message, Typography } from 'antd';
import React from 'react';
import { deleteTrip, getTripByUser, getUpcomingTripByUser, getPastTripByUser } from '../utils';
import Hist from './Hist'
 
const columns = [
  {
    title: 'Trip Name',
    dataIndex: 'name',
    key: 'name',
    width: '600px', 
    render: (text) => <h3 className="trip">{text}</h3>,
  },
  {
    title: 'Destination',
    dataIndex: 'destination',
    key: 'destination',
    width: '600px',
    render: (text) => <h3 className="trip">{text}</h3>,
  },
  {
    title: 'Start Date',
    dataIndex: 'beg_date',
    key: 'beg_date',
    width: '600px',
    render: (text) => <h3 className="trip">{text}</h3>,
  },
  {
    title: 'End Date',
    dataIndex: 'end_date',
    key: 'end_date',
    width: '600px',
    render: (text) => <h3 className="trip">{text}</h3>,
  },
  // Table.EXPAND_COLUMN,
];
 
class RemoveTripButton extends React.Component {
  state = {
    loading: false,
  };
 
  handleRemoveTrip = async () => {
    const { trip, onRemoveSuccess } = this.props;
    this.setState({
      loading: true,
    });
  
    try {
      await deleteTrip(trip.tripid);
      onRemoveSuccess();
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };
 
  render() {
    return (
      <Button
        loading={this.state.loading}
        onClick={this.handleRemoveTrip}
        type="default"
        danger="true"
        className="buttontest"
        shape="round"
        icon={<DeleteOutlined />}
        size="small">
        Delete
      </Button>
    );
  }
}


class ModifyTripButton extends React.Component {

  handleModifyTrip = () => {
    console.log(this.props.trip.tripid);
    this.props.onclick(this.props.trip.tripid);
  }
 
  render() {
    return (
      <Button
        onClick={this.handleModifyTrip}
        type="default"
        className="buttontest"
        shape="round"
        icon={<EditOutlined />}
        size="small">
        Modify
      </Button>
    );
  }
}
 
 
class ManageTrip extends React.Component {

  constructor() {
    super();
    this.state = {
      loading: false,
      datau: [],
      datap: [],
      stat: [],
    }
  }
  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    this.setState({
      loading: true,
      stat: [],
    });
    try {
      // const resp1 = await getUpcomingTripByUser().then((value) => {        
      //   console.log(value);
      //   this.setState({
      //     datau: this.getTable(value,"Upcoming"),
      //   });
      // })
      // const resp2 = await getPastTripByUser().then((value) => {        
      //   console.log(value);
      //   this.setState({
      //     datap: this.getTable(value,"Past"),
      //   });
      // })
      const resp = await getTripByUser().then((value) => {        
        console.log(value);
        this.getTable(value);
      })
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  stringToDate = (input) => {
    let parts = input.split('-');
    let mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
    return mydate;
  }
  dateToString = (date) => {
    return date.toDateString();
  };
  // getTable = (value,label) => {
  getTable = (value) => {
    const today = new Date();
    let testdatau = [];
    let testdatap = [];
    // let testdata = [];
    let statistics = this.state.stat;
    let idxu = 0, idxp = 0;
    for (let i=0;i<value.length;i++) {
      let mydate = this.stringToDate(value[i].checkin);
      let nodate = this.stringToDate(value[i].checkout);
      let line = {
        key: i+1,
        name: value[i].name,
        destination: 'LA',
        beg_date: value[i].checkin,
        end_date: value[i].checkout,
        tripid: value[i].tripId,
        poiSet: value[i].poiSet,
        plan: value[i].plan,
        itinerary: [],
      }
      // testdata[i] = line;
      let tt = "";
      if (nodate<today) {
        testdatap[idxp++]=line;
        tt="past";
      } else {
        testdatau[idxu++]=line;
        tt="upcoming";
      }
      console.log(idxp);
      console.log(idxu);
      // let mydate = this.stringToDate(testdata[i].beg_date);
      let idx=0,day=0;
      // let plan = testdata[i].plan;
      let plan = line.plan;
      console.log(plan);
      for (let j=0;j<plan.length;j++) {
        if (j==0 || plan[j]===',') {
          day++;
          if (j>0) {mydate.setDate(mydate.getDate() + 1);}
          while (plan[j]!='#') {
            j++;
          }
          j++;
        }
        let tmp=j+12;
        let val=0;
        while (plan[tmp]!='#') {
          val=val*10+(plan[tmp++]-'0');        
        }
        // let poi = testdata[i].poiSet.filter((item)=>item.id===val);
        let poi = line.poiSet.filter((item)=>item.id===val);
        console.log(line.tripid);
        console.log("poi");
        console.log(poi[0]);
        // const found = statistics.some((item)=>item.id===val && item.type===label);
        const found = statistics.some((item)=>item.id===val && item.type===tt);
        if (found) {
          // statistics.filter((item)=>{return item.id===val && item.type===label})[0].count++;
          statistics.filter((item)=>{return item.id===val && item.type===tt})[0].count++;
        } else {
          const item = {
            id: val,
            name: poi[0].name,
            // type: label,
            type: tt,
            count: 1,
          }
          statistics=[...statistics,item];
        }
        console.log( plan );
        // testdata[i].itinerary[idx++]={
        line.itinerary[idx++]={
          day: day,
          date: this.dateToString(mydate),
          beg_time: plan.substring(j,j+5),
          end_time: plan.substring(j+6,j+11),
          poi: poi[0].name,
        }
        j=tmp;
      }
    }
    console.log("stat");
    this.setState({
      stat: statistics,
      datap: testdatap,
      datau: testdatau,
    })
    console.log(this.state.stat);
    // return testdata;
  }

  render() {
    return (
      <>
      <Row>
        <Col span={12} className="left-side" >
          <Typography.Title
            level={2}
            style={{
              margin: 0,
            }}
          >
          Upcoming Trips
          </Typography.Title>
          <Table
            columns={columns}
            expandable={{
              expandedRowRender: (record) => (
                <Row>
                  <Col span={16}>
                    <Timeline mode="left" className={"timelineobj"}>
                      {record.itinerary.map((step) => (
                        <Timeline.Item className={"fonttest"} label={step.date+" "+step.beg_time}>
                          {step.poi}
                        </Timeline.Item>
                      ))}
                    </Timeline>
                  </Col >
                  <Col span={8} className="btn-container" >
                    <ModifyTripButton trip={record} onclick={this.props.modifyTrip} />
                    <RemoveTripButton trip={record} onRemoveSuccess={this.loadData} />
                  </Col>
                </Row>
              ),
            }}
            dataSource={this.state.datau}
            // dataSource={data}
            pagination={{
              pageSize: 8,
            }}
          />
        </Col> 
        <Col span={12} className="right-side" >
          <Typography.Title
            level={2}
            style={{
              margin: 0,
            }}
          >
          Past Trips
          </Typography.Title>
          <Table
            columns={columns}
            expandable={{
              expandedRowRender: (record) => (
                <Row>
                  <Col span={16}>
                    <Timeline mode="left" className={"timelineobj"}>
                      {record.itinerary.map((step) => (
                        <Timeline.Item className={"fonttest"} label={step.date+" "+step.beg_time}>
                          {step.poi}
                        </Timeline.Item>
                      ))}
                    </Timeline>
                  </Col >
                  <Col span={8} className="btn-container" >
                    <RemoveTripButton trip={record} onRemoveSuccess={this.loadData} />
                  </Col>
                </Row>
              ),
            }}
            dataSource={this.state.datap}
            // dataSource={data}
            pagination={{
              pageSize: 8,
            }}
          />
        </Col>  
      </Row>
      <Row>
          { !this.state.loading &&
          <div className="hist1">
          <Typography.Title
            level={2}
          >
            Frequency Histogram of POI
          </Typography.Title>
            <Hist data={this.state.stat} />
          </div>
          }
      </Row>
      </>
    )
  }
};
 
export default ManageTrip;
