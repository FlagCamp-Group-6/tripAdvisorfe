import { Table, Col, Button, message } from 'antd';
import { saveTrip } from '../utils'
import React, { useCallback, useRef, useState, useEffect } from 'react';
import {GOOG_API_KEY, GDIR_BASE_URL} from "../constants";
import update from 'immutability-helper';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from 'axios';

const type = 'DraggableBodyRow';

const DraggableBodyRow = ({ index, moveRow, className, style, ...restProps }) => {
  const ref = useRef(null);
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};

      if (dragIndex === index) {
        return {};
      }

      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: (item) => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    type,
    item: {
      index,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{
        cursor: 'move',
        ...style,
      }}
      {...restProps}
    />
  );
};

const columns = [
    {
      title: 'Day',
      dataIndex: 'day',
      key: 'day',
      render: (text) => <h3 className="visit">{text}</h3>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => <h3 className="visit">{text}</h3>,
    },
    {
      title: 'Start Time',
      dataIndex: 'start_time',
      key: 'start_time',
      render: (text) => <h3 className="visit">{text}</h3>,
    },
    {
      title: 'End Time',
      dataIndex: 'end_time',
      key: 'end_time',
      render: (text) => <h3 className="visit">{text}</h3>,
    },
    {
      title: 'Point Of Interest',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <h3 className="visit">{text}</h3>,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: (text) => <h3 className="visit">{text}</h3>,
    },
  ]


  const PlanTrip = ({selected}) => {
    const [url,setUrl] = useState("abc");
    const [data,setData] = useState ([
    {
        key: 1,
        day: '1',
        date: '07/19',
        start_time: '11:00',
        end_time: '14:00',
        name: 'Academy Museum of Motion Pictures',
        address: '6067 Wilshire Blvd., Los Angeles',
        latitude: 34.063333,
        longitude: -118.360833,
    },
    {
        key: 2,
        day: '1',
        date: '07/19',
        start_time: '21:00',
        end_time: '22:00',
        name: 'Griffith Observatory',
        address: '2800 E Observatory Rd., Los Angeles',
        latitude: 34.118611,
        longitude: -118.300278,
    },
    {
        key: 3,
        day: '2',
        date: '07/20',
        start_time: '10:00',
        end_time: '16:00',
        name: 'Universal Studio Hollywood',
        address: '100 Universal City Plaza, Universal City',
        latitude: 34.138117,
        longitude: -118.353378,
    },
    ]);
    const saveOnClick = () => {
        saveTrip(data)
        .catch((err) => {
          message.error(err)
        })
      }
      const components = {
        body: {
          row: DraggableBodyRow,
        },
      };
      const moveRow = useCallback(
        (dragIndex, hoverIndex) => {
          const dragRow = data[dragIndex];
          setData(
            update(data, {
              $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragRow],
              ],
            }),
          );
        },
        [data],
      );


      useEffect(() => {
        const input=processUrl();
        setUrl(input);
        // fetch(url,{
        //   mode: 'no-cors',
        // })
        // .then(response => {
        //     console.log(response.data)
        //     this.setState({
        //         mapInfo: response.data,
        //     })
        // })
        // .catch(error => {
        //     console.log('err in fetch map -> ', error);
        // })
      });

      const processUrl = () => {
        var newurl = GDIR_BASE_URL
        .replace('YOUR_API_KEY',GOOG_API_KEY);
        for (let i=0;i<1;i++) {
            newurl=newurl.replace('parameters',`origin=${data[i].latitude}%2C${data[i].longitude}&parameters`);
        }
        for (let i=1;i<data.length-1;i++) {
          newurl=newurl.replace('parameters',`waypoints=${data[i].latitude}%2C${data[i].longitude}&parameters`);
        }
        for (let i=data.length-1;i<data.length;i++) {
          newurl=newurl.replace('parameters',`destination=${data[i].latitude}%2C${data[i].longitude}&parameters`);
        }
        console.log(newurl=newurl.replace('parameters&',''));
        return newurl;
    }

    return (
    <>
    <Col span={12} className="left-side">
    <DndProvider backend={HTML5Backend}>
      <Table
        className="visittable"
        columns={columns}
        dataSource={data}
        components={components}
        onRow={(_, index) => {
          const attr = {
            index,
            moveRow,
          };
          return attr;
        }}
      />
    </DndProvider>
    <table height="100px"></table>
    <Col span="4" offset="20">
    <Button
    className="trip-save"
    size="large"
    shape="round"
    type="primary"
    onClick={saveOnClick}
    > Save</Button>
    </Col>
    </Col>    
    <Col span={12} className="right-side">
      <span>{url}</span>
    </Col>
    </>
  )};
export default PlanTrip;