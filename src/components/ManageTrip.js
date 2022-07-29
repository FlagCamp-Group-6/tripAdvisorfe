import { Table, Timeline, Col, Typography } from 'antd';
import React from 'react';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <h3 className="trip">{text}</h3>,
  },
  {
    title: 'Destination',
    dataIndex: 'destination',
    key: 'destination',
    render: (text) => <h3 className="trip">{text}</h3>,
  },
  {
    title: 'Number of Days',
    dataIndex: 'number_of_days',
    key: 'number_of_days',
    render: (text) => <h3 className="trip">{text}</h3>,
  },
  {
    title: 'Number of Travelers',
    dataIndex: 'number_of_travelers',
    key: 'number_of_travelers',
    render: (text) => <h3 className="trip">{text}</h3>,
  },
  Table.EXPAND_COLUMN,
];
const data = [
  {
    key: 1,
    name: 'Trip 1',
    destination: 'LA',
    number_of_travelers: '5',
    number_of_days: '3',
    itinerary: [{
        "date":"D1",
        "poi":"Hollywood",
    },{
        "date":"D2",
        "poi":"Universal Studio",
    },{
        "date":"D3",
        "poi":"Disney",
    }],
  },
  {
    key: 2,
    name: 'Trip 2',
    destination: 'LA',
    number_of_travelers: '3',
    number_of_days: '2',
    itinerary: [{
        "date":"D1",
        "poi":"Hollywood",
    },{
        "date":"D2",
        "poi":"Universal Studio",
    }],
  },
  {
    key: 3,
    name: 'Trip 3',
    destination: 'LA',
    number_of_travelers: '6',
    number_of_days: '2',
    itinerary: [{
        "date":"D1",
        "poi":"Hollywood",
    },{
        "date":"D2",
        "poi":"Disney",
    }],
  },
];

const ManageTrip = () => (
    <>
    <Col span={13} className="left-side">
    <Table
    columns={columns}
    dataSource={data}
    rowSelection={{}}
    expandable={{
      expandedRowRender: (record) => (
          <Timeline>    
                  {record.itinerary.map((step) => (
                    <Timeline.Item>
                      <h3>{step.date} {step.poi}</h3>
                    </Timeline.Item>
                  ))}
            </Timeline>
      ),
    }}
  />
  </Col>
  <Col span={6} className="right-side">
    <p>
        Load trips from database (cannot just load POIs in case the user can adjust the route)                    
    </p>
    <p>
        Draw trips based on used record
    </p>
  </Col>
  </>
);

export default ManageTrip;