import React from 'react';
import { PlusCircleFilled, MinusCircleFilled, CaretLeftOutlined, CaretRightOutlined, CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { Slider, Tooltip, Button, Row, Col, Typography, Radio } from 'antd';
import {GOOG_API_KEY, GMAP_BASE_URL} from "../constants";
import { FaLocationArrow } from 'react-icons/fa'

const options = [
    {
      label: 'Roadmap',
      value: 'roadmap',
    },
    {
      label: 'Satellite',
      value: 'satellite',
    },
    {
      label: 'Hybrid',
      value: 'hybrid',
    },
    {
      label: 'Terrain',
      value: 'terrain',
    },
  ];

class DrawPoints extends React.Component {
    constructor(){
        super();
        this.state = {
            zoom: 9,
            longitude: -118.35,
            latitude: 34.05,
            hor: 400,
            ver: 400,
            scale: 2,
            type: 'roadmap',
        };
    }

    onChange = ({ target: { value } }) => {
        console.log('type checked', value);
        this.setState({
            type: value,
        });
      };

    reset = () => {
        this.setState({
            zoom: 9,
            longitude: -118.35,
            latitude: 34.05,
        });
    }

    setValue = (value) => {
        this.setState({
            zoom: value,
        });
    }

    zoomin = () => {
        const newValue = this.state.zoom+1;
        this.setState({
            zoom: newValue,
        });
    }

    zoomout = () => {
        const newValue = this.state.zoom-1;
        this.setState({
            zoom: newValue,
        });
    }

    moveleft = () => {
        const newValue = this.state.longitude-0.1;
        this.setState({
            longitude: newValue,
        });
    }

    moveright = () => {
        const newValue = this.state.longitude+0.1;
        this.setState({
            longitude: newValue,
        });
    }

    moveup = () => {
        const newValue = this.state.latitude+0.1;
        this.setState({
            latitude: newValue,
        });
    }

    movedown = () => {
        const newValue = this.state.latitude-0.1;
        this.setState({
            latitude: newValue,
        });
    }

    processUrl = () => {
        const {selected} = this.props;
        console.log(selected);
        var newurl = GMAP_BASE_URL
        .replace('YOUR_API_KEY',GOOG_API_KEY)
        .replace('YOUR_CENTER',this.state.latitude+","+this.state.longitude)
        .replace('YOUR_ZOOM',this.state.zoom)
        .replace('YOUR_HV',this.state.hor)
        .replace('YOUR_VV',this.state.ver)
        .replace('YOUR_SCALE',this.state.scale)
        .replace('YOUR_TYPE',this.state.type);
        for (let i=0;i<selected.length;i++) {
            newurl=newurl.replace('YOUR_MARKER',`${selected[i].latitude},${selected[i].longitude}&markers=YOUR_MARKER`);
        }
        newurl=newurl.replace('markers=YOUR_MARKER&','');
        console.log(newurl);
        return newurl;
    }
    render() {
        return (
            <div>
                <Row className = 'controlbar'>
                <Col span={8}>
                <Radio.Group options={options} onChange={this.onChange} value={this.state.type} optionType="button" buttonStyle="solid" />
                </Col>
                <Col span={2} >
                <Tooltip title="zoom-out">
                <Button type="primary" shape="circle" icon={<MinusCircleFilled />} onClick={this.zoomout}/>
                </Tooltip>    
                </Col>
                <Col span={6}>
                <Slider min={5} max={15} onChange={this.setValue} value={this.state.zoom} />
                </Col>
                <Col span={2}>
                <Tooltip title="zoom-in">
                <Button type="primary" shape="circle" icon={<PlusCircleFilled />} onClick={this.zoomin} />
                </Tooltip>
                </Col>
                </Row>
                <Row className = 'maprow'>
                <img src={this.processUrl()} className='pointmap'/>
                </Row>
                <Row className = 'shift'>
                <Button type="primary" shape="circle" icon={<CaretUpOutlined />} onClick={this.moveup} id='moveup'/>
                <Button type="primary" shape="circle" icon={<CaretLeftOutlined />} onClick={this.moveleft} id='moveleft'/>
                <Button type="primary" shape="circle" icon={<FaLocationArrow />} onClick={this.reset} id='reset'/>
                <Button type="primary" shape="circle" icon={<CaretRightOutlined />} onClick={this.moveright} id='moveright' />
                <Button type="primary" shape="circle" icon={<CaretDownOutlined />} onClick={this.movedown} id='movedown'/>
                </Row>
            </div>
        );}
}
export default DrawPoints;