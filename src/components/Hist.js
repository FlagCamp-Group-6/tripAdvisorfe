import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/plots';

const Hist = ({data}) => {
    console.log("data");
    console.log(data);
  const config = {
    data,
    isStack: true,
    xField: 'name',
    yField: 'count',
    seriesField: 'type',
    columnWidthRatio: 0.7,
    label: {
      position: 'middle',
      // 'top', 'bottom', 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: true,
      },
    },
    // meta: {
    //   name: {
    //     alias: 'POI',
    //   },
    //   count: {
    //     alias: 'Liked',
    //   },
    // },
    layout: [
        {
          type: 'interval-adjust-position',
        }, 
        {
          type: 'interval-hide-overlap',
        }, 
        {
          type: 'adjust-color',
        },
      ],
  };
  return <Column {...config} />;
};

export default Hist
