import { Table, Col, Button, Space, message, Popconfirm, Typography } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";
import { saveTrip, getTripByID, getPlanFromTrip, delPOIFromTrip, getNewestTripIDByUser } from '../utils'
import React, { useCallback, useRef, useState, useEffect } from 'react';
// import update from 'immutability-helper';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Map from './Map';
// import { ChakraProvider, theme } from '@chakra-ui/react'
const { Text } = Typography;

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

  const PlanTrip = ({curTrip,setTrip}) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [beg_date, setBeg_date] = useState([]);
    const [end_date, setEnd_date] = useState([]);    
    const [poiSet, setPoiSet] = useState([]);
    const [data, setData] = useState ([]);
    const [deleting, setDeleting] = useState([]);
    const [name, setName] = useState("");
    const [plan, setPlan] = useState("");
    const [curPlan, setCurPlan] = useState([]);

    useEffect(() => {
      try {
        console.log(curTrip);
        if (curTrip==null || curTrip==-1) {
          const resp = getNewestTripIDByUser().then((value) => {
            console.log(value); 
            setTrip(value);
          });
        }

        const resp1 = getTripByID(curTrip).then((value) => {
          console.log("trip looks like");
          console.log(value);
          let mydate = stringToDate(value.checkin);
          setName(value.name);
          setBeg_date(value.checkin);
          setEnd_date(value.checkout);
          setPoiSet(value.poiSet);
          setPlan(value.plan);
          console.log("plan in string "+value.plan);
          console.log("poiset is");
          console.log(value.poiSet);
          const vp = value.plan;
          let idx=0,day=0;
          let testdata = [];
          mydate.setDate(mydate.getDate() - 1);
          for (let i=0;i<vp.length;i++) {
            if (i===0 || vp[i]===',') {
              while (vp[i]!=='#') {i++;}
              i++;day++;
              mydate.setDate(mydate.getDate() + 1);
            }
            const sbeg = vp.substring(i,i+5);
            const send = vp.substring(i+6,i+11);
            i+=12;
            let num=0;
            while (vp[i]!=='#') {
              num=num*10+(vp[i++]-'0');
            }
            console.log(num);
            const poi = value.poiSet.filter((item) => item.id === num);
            console.log("poi is");
            console.log(poi);
            testdata[idx++]={
              key: idx+1,
              detail: {
                day: day,
                date: dateToString(mydate),
                start_time: sbeg,
                end_time: send,
                time_taken: poi[0].timeTaken,
                name: poi[0].name,
                address: poi[0].address,
                latitude: poi[0].latitude,
                longitude: poi[0].longitude,
                id: num,
              }
            }
          }
          console.log(testdata);
          setData(testdata);
          // const resp2 = getPlanFromTrip(curTrip).then((plan) => {
          //   setCurPlan(plan);
          //   console.log("plan in list "+plan);
          //   let testdata = [];
          //   let idx=0;
          //   for (let i=0;i<plan.length;i++) {
          //     let time=10.0;
          //     for (let j=0;j<plan[i].length;j++) {
          //       const beghh = parseInt(time,10);
          //       const tempb = parseInt((time-beghh)*60);
          //       const begmm = (tempb<10?"0":"")+tempb;
          //       const finish = time+plan[i][j].timeTaken;
          //       const endhh = parseInt(finish,10);
          //       const tempe = parseInt((finish-endhh)*60);
          //       const endmm = (tempe<10?"0":"")+tempe;
          //       testdata[idx]={
          //         key: idx+1,
          //         detail: {
          //           day: i+1,
          //           date: dateToString(mydate),
          //           start_time: beghh+":"+begmm,
          //           end_time: endhh+":"+endmm,
          //           time_taken: plan[i][j].timeTaken,
          //           name: plan[i][j].name,
          //           address: plan[i][j].address,
          //           latitude: plan[i][j].latitude,
          //           longitude: plan[i][j].longitude,
          //           id: plan[i][j].id,
          //         }
          //       }
          //       idx++;
          //       time=finish+1.0;
          //     } // end for j
          //     mydate.setDate(mydate.getDate() + 1);
          //   } // end for i
          //   setData(testdata);
          // });
        });
      } catch (error) {
        message.error(error.message);
      } finally {
      }
    },[curTrip]);

    // help to convert between date and string
    const dateToString = (date) => {
      return date.toDateString();
    };
    const stringToDate = (input) => {
      let parts = input.split('-');
      let mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
      return mydate;
    }

    // table definition
    const components = {
      body: {
        row: DraggableBodyRow,
      },
    };
    // const columns = [
    //   {
    //     title: 'Day',
    //     dataIndex: 'day',
    //     key: 'day',
    //     render: (text) => <h3 className="visit">{text}</h3>,
    //   },
    //   {
    //     title: 'Date',
    //     dataIndex: 'date',
    //     key: 'date',
    //     render: (text) => <h3 className="visit">{text}</h3>,
    //   },
    //   {
    //     title: 'Start Time',
    //     dataIndex: 'start_time',
    //     key: 'start_time',
    //     render: (text) => <h3 className="visit">{text}</h3>,
    //   },
    //   {
    //     title: 'End Time',
    //     dataIndex: 'end_time',
    //     key: 'end_time',
    //     render: (text) => <h3 className="visit">{text}</h3>,
    //   },
    //   {
    //     title: 'Recommmend Time',
    //     dataIndex: 'time_taken',
    //     key: 'time_taken',
    //     render: (text) => <h3 className="visit">{text}</h3>,
    //   },
    //   {
    //     title: 'Point Of Interest',
    //     dataIndex: 'name',
    //     key: 'name',
    //     render: (text) => <h3 className="visit">{text}</h3>,
    //   },
    //   {
    //     title: 'Address',
    //     dataIndex: 'address',
    //     key: 'address',
    //     render: (text) => <h3 className="visit">{text}</h3>,
    //   },
    //   // Table.SELECTION_COLUMN,
    //   {
    //     title: 'Skip',
    //     dataIndex: 'skip',
    //     key: 'skip',
    //     render: (_, record) => 
    //       data.length >= 1 ? (
    //         <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
    //           <Button type='primary' shape='round'>Skip</Button>
    //           {/* <a>Delete</a> */}
    //         </Popconfirm>
    //       ) : null,
    //   },
    // ]

    const columns = [
      {
        title: `Day-to-day description of trip ${name} with ID ${curTrip} starting from ${beg_date} to ${end_date}`,
        dataIndex: 'detail',
        key: 'detail',
        render: (record,line) => <>
        <Typography.Title
          level={5}
          className = "firstline"
        >
          <Col span={8}>
          Day {record.day} {record.date} 
          </Col>
          <Col span={8}>
          {record.start_time} to {record.end_time}
          </Col>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(line.key)}>
            <Button shape='round' icon={<DeleteOutlined />} />
          </Popconfirm>
        </Typography.Title>
        <Text>
          Take {record.time_taken} hours for
        </Text>
        <Typography.Title
          level={5}
        >
        {record.name}
        </Typography.Title>
        <Text>
        {record.address}
        </Text>
          </>,
      },

    ]

    // to delete poi from table
    const handleDelete = (key) => {
      const del = data.filter((item) => item.key===key);
      // const poiid = del[0].id;
      const poiid = del[0].detail.id;
      let deleted = deleting;
      deleted = [...deleted, poiid];
      setDeleting(deleted);
      // delPOIFromTrip(poiid,curTrip);
      const newData = data.filter((item) => item.key !== key);
      changePlan(newData);
    };

    // to select poi from table to plot
    const onSelectChange = (newSelectedRowKeys) => {
      console.log(newSelectedRowKeys);
      setSelectedRowKeys(newSelectedRowKeys);
    };  
    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    };

    // to reset trip
    const resetOnClick = () => {
      console.log(curTrip);
      setTrip(-1);
    }

    // to save updated trip
    const saveOnClick = async () => {

      const res = deleting.map((item) => {
        delPOIFromTrip(item,curTrip);
      });

      let day=1;
      let plan="D1#";
      for (let idx=0;idx<data.length;idx++) {
        if (data[idx].detail.day>day) {
          day++;
          plan=plan+",D"+day+"#";
        }
        plan=plan+data[idx].detail.start_time+"-"+data[idx].detail.end_time+":"+data[idx].detail.id+"#";
      }
      setLoading(true);
      try {
        await saveTrip(curTrip,plan);
      } catch (error) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }
      console.log("saved");
    };

    // for draggable table
    const moveRow = useCallback(
      (dragIndex, hoverIndex) => {
        const dragRow = data[dragIndex];
        // setData(
        //   update(data, {
        //     $splice: [
        //       [dragIndex, 1],
        //       [hoverIndex, 0, dragRow],
        //     ],
        //   }),
        // );
        let newData = [...data];
        newData.splice(dragIndex,1);
        newData.splice(hoverIndex,0,dragRow);
        changePlan(newData);
      },
      [data],
    );

    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    // a and b are javascript Date objects
    function dateDiffInDays(a, b) {
      // Discard the time and time-zone information.
      const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

      return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }

    const changePlan = (newdata) => {
      let mydate = stringToDate(beg_date);
      const nodate = stringToDate(end_date);
      const days = dateDiffInDays(mydate, nodate);
      const dif = newdata.length-(days+1);
      let testdata = [];
      let curday=1;
      let curtime=10.0;
      for (let idx=0;idx<newdata.length;idx++) {
        let finish = curtime+newdata[idx].detail.time_taken;
        if (idx>0 && (finish>18.0 || dif<=0 || newdata[idx-1].detail.time_taken>=5.0 || newdata[idx].detail.time_taken>=5.0)) {
          curtime=10.0;
          mydate.setDate(mydate.getDate() + 1);
          curday++;
          finish=curtime+newdata[idx].detail.time_taken;
        }
        const beghh = parseInt(curtime,10);
        const tempb = parseInt((curtime-beghh)*60);
        const begmm = (tempb<10?"0":"")+tempb;
        const endhh = parseInt(finish,10);
        const tempe = parseInt((finish-endhh)*60);
        const endmm = (tempe<10?"0":"")+tempe;
        testdata[idx]={
          key: newdata[idx].key,
          detail: {
          day: curday,
          date: dateToString(mydate),
          start_time: beghh+":"+begmm,
          end_time: endhh+":"+endmm,
          time_taken: newdata[idx].detail.time_taken,
          name: newdata[idx].detail.name,
          address: newdata[idx].detail.address,
          latitude: newdata[idx].detail.latitude,
          longitude: newdata[idx].detail.longitude,
          id: newdata[idx].detail.id,
          }
        }
        curtime+=newdata[idx].detail.time_taken;
        curtime+=1.0;
      }
      setData(testdata);
    }


    return (
    <>
    <Col span={13} className="left-side">
      <Space>
      <Button className="trip-save"
      shape="round"
      // onClick={saveOnClick}
      onClick = {(e) => {e.currentTarget.blur();saveOnClick();}}
      > Save Trip</Button>
      <Button className="trip-reset"
      shape="round"
      // onClick={resetOnClick}
      onClick = {(e) => {e.currentTarget.blur();resetOnClick();}}
      > Reset Trip</Button>
      </Space>      
    <DndProvider backend={HTML5Backend}>
      <Table
        className="visittable"
        columns={columns}
        rowSelection={rowSelection}
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
    </Col>    
    <Col span={11} className="right-side">
    {/* <ChakraProvider theme={theme}>
      <Map data={data} keys={selectedRowKeys}/>
    </ChakraProvider> */}
    <div style={{width: "100vm", height:"60vh"}}>
    <Map data={data} keys={selectedRowKeys}/>
    </div>
    </Col>
    </>
  )};


export default PlanTrip;