import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table, Timeline, Col, Button, Row, message } from 'antd';
import React from 'react';
import { deleteTrip, loadTrip } from '../utils';
import Main from './Main';

 
 
const columns = [
 
  {
    title: 'Trip Name',
    dataIndex: 'name',
    key: 'name',
    width: '600px', 
    render: (text) => <h1 className="trip">{text}</h1>,
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
 
const data = [
  {
    key: 1,
    name: 'Trip 1',
    destination: 'LA',
    beg_date: '8/1/2022',
    end_date: '8/3/2022',
    itinerary: [{
      "date": "D1",
      "poi": "Hollywood",
    }, {
      "date": "D2",
      "poi": "Universal Studio",
    }, {
      "date": "D3",
      "poi": "Disney",
    }],
  },
  {
    key: 2,
    name: 'Trip 2',
    destination: 'LA',
    beg_date: '7/16/2022',
    end_date: '7/22/2022',
    itinerary: [{
      "date": "D1",
      "poi": "Hollywood",
    }, {
      "date": "D2",
      "poi": "Universal Studio",
    }],
  },
  {
    key: 3,
    name: 'Trip 3',
    destination: 'LA',
    beg_date: '6/6/2022',
    end_date: '6/11/2022',
    itinerary: [{
      "date": "D1",
      "poi": "Hollywood",
    }, {
      "date": "D2",
      "poi": "Disney",
    }],
  },
];
 
const onChange = (key) => {
  console.log(key);
};
 
 
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
      await deleteTrip(trip.id);
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
        className="bottontest"
        shape="round"
        icon={<DeleteOutlined />}
        size="small">
        delete
      </Button>
    );
  }
}

class ModifyTripButton extends React.Component {
 
  handleModifyTrip = () => {
    //
  }
 
  render() {
    return (
      <Button
        onClick={this.modifyRemoveTrip}
        type="default"
        className="bottontest"
        shape="round"
        icon={<EditOutlined />}
        size="small">
        modify
      </Button>
    );
  }
}
 
 
class ManageTrip extends React.Component {
 
  loadData = async () => {
    this.setState({
      loading: true,
    });
 
    try {
      const resp = await loadTrip();
      this.setState({
        data: resp,
      });
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
      <Row>
        <Col span={12} className="left-side" >
          <h1>Upcoming Trips</h1>
          <Table
            columns={columns}
            expandable={{
              expandedRowRender: (record) => (
                <Row>
                  <Col span={16}>
                    <Timeline mode="left" className={"timelineobj"}>
                      {record.itinerary.map((step) => (
                        <Timeline.Item className={"fonttest"} >
                          {step.date} {step.poi}
                        </Timeline.Item>
                      ))}
                    </Timeline>
                  </Col >
                  <Col span={8} className="btn-container" >
                    <ModifyTripButton trip={record} onclick={this.modifyData} />
                    <RemoveTripButton trip={record} onRemoveSuccess={this.loadData} />
                  </Col>
                </Row>
              ),
            }}
            dataSource={data}
          />
        </Col> 
        <Col span={12} className="right-side" >
          <h1>Past Trips</h1>
          <Table
            columns={columns}
            expandable={{
              expandedRowRender: (record) => (
                <Row>
                  <Col span={16}>
                    <Timeline mode="left" className={"timelineobj"}>
                      {record.itinerary.map((step) => (
                        <Timeline.Item className={"fonttest"} >
                          {step.date} {step.poi}
                        </Timeline.Item>
                      ))}
                    </Timeline>
                  </Col >
                  <Col span={8} className="btn-container" >
                    {/* <ModifyTripButton trip={record} onclick={this.modifyData} /> */}
                    <RemoveTripButton trip={record} onRemoveSuccess={this.loadData} />
                  </Col>
                </Row>
              ),
            }}
            dataSource={data}
          />
        </Col>  
      </Row>
    )
  }
};
 
export default ManageTrip;