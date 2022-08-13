import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table, Timeline, Col, Button, Row, message } from 'antd';
import React from 'react';
import { deleteTrip, getTripByUser } from '../utils';
 
 
const columns = [
 
  {
    title: 'Trip Name',
    dataIndex: 'name',
    key: 'name',
    width: '300px',
    render: (text) => <h1 className="trip">{text}</h1>,
  },
  {
    title: 'Destination',
    dataIndex: 'destination',
    key: 'destination',
    width: '300px',
    render: (text) => <h3 className="trip">{text}</h3>,
  },
  {
    title: 'Duration',
    dataIndex: 'number_of_days',
    key: 'number_of_days',
    width: '300px',
    render: (text) => <h3 className="trip">{text}</h3>,
  },
  {
    title: 'Travelers',
    dataIndex: 'number_of_travelers',
    key: 'number_of_travelers',
    width: '300px',
    render: (text) => <h3 className="trip">{text}</h3>,
  },
  // Table.EXPAND_COLUMN,
];
 
const data = [
  {
    key: 1,
    name: 'Trip 1',
    destination: 'LA',
    number_of_travelers: '5',
    number_of_days: '3',
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
    number_of_travelers: '3',
    number_of_days: '2',
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
    number_of_travelers: '6',
    number_of_days: '2',
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
    const { stay, onRemoveSuccess } = this.props;
    this.setState({
      loading: true,
    });
 
    try {
      await deleteTrip(stay.id);
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
 
 
class ManageTrip extends React.Component {
 
  loadData = async () => {
    this.setState({
      loading: true,
    });
 
    try {
      const resp = await getTripByUser();
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
        <Col span={16} className="left-side" >
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
                    <Button type="default" className="bottontest" shape="round" icon={<EditOutlined />} size="small" >modify</Button>
                    <RemoveTripButton trip={record} onRemoveSuccess={this.loadData} />
                  </Col>
                </Row>
              ),
            }}
            dataSource={data}
          />
        </Col>
        <Col span={8} className="right-side">
          <p>
            Load trips from database (cannot just load POIs in case the user can adjust the route)
          </p>
          <p>
            Draw trips based on used record
          </p>
        </Col>
      </Row>
    )
  }
};
 
export default ManageTrip;