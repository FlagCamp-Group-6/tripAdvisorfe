import React from "react";
import { Radio, Image, Card, Carousel, Row, Col, Typography, Layout } from 'antd';
import usmap from '../images/Blank_US_Map.svg';
import fign1 from '../images/NY/NY.jpg' 
import figl1 from '../images/LA/LA.jpg' 
import figc1 from '../images/CHI/Chicago.jpg' 
import figm1 from '../images/MIA/Miami.jpg' 
import figh1 from '../images/HOU/Houston.jpg' 
import figs1 from '../images/SF/SF.jpg' 
import figw1 from '../images/WDC/DC.jpg' 

const { Content} = Layout;

class HomePage extends React.Component {

  radioChangeHandler = e => {
    this.props.handleSelection(e.target.value);
  };

  render() {
    
    return (
      <Content
      style={{
        padding: '0px 24px',
        minHeight: 1600,
      }}
    >
        <Row>
        <Col span={12}>
        <img src={usmap} alt="Have a nice trip" className="usamap" title="Where is your favoriate destination" width="1534" height="949" />
        <Radio.Group name="cities" defaultValue={1} onChange={this.radioChangeHandler} className="radiogroup1">
            <Radio value={1} className='radio1'><h3>New York</h3></Radio>
            <Radio value={2} className='radio2'><h3>Los Angeles</h3></Radio>
            <Radio value={3} className='radio3'><h3>Chicago</h3></Radio>
            <Radio value={4} className='radio4'><h3>Miami</h3></Radio>
            <Radio value={5} className='radio5'><h3>Houston</h3></Radio>
            <Radio value={6} className='radio6'><h3>San Francisco</h3></Radio>
            <Radio value={7} className='radio7'><h3>Washington D.C.</h3></Radio>
        </Radio.Group>
        </Col>
          <Col className='carousel' span={8} offset={16}>
          <Card title={
            <Typography.Title
              level={1}
            >
            Which city do you plan to go?
            </Typography.Title>
          } id='card'>
          <Carousel autoplay vertical="true">
            <div>
            <Image src={fign1} height="800px" width="800px" alt="New York"/>
            </div>
            <div>
            <Image src={figl1} height="800px" width="800px" alt="Los Angeles"/>
            </div>
            <div>
            <Image src={figc1} height="800px" width="800px" alt="Chicago"/>
            </div>
            <div>
            <Image src={figm1} height="800px" width="800px" alt="Miami"/>
            </div>
            <div>
            <Image src={figh1} height="800px" width="800px" alt="Houston"/>
            </div>
            <div>
            <Image src={figs1} height="800px" width="800px" alt="San Francisco"/>
            </div>
            <div>
            <Image src={figw1} height="800px" width="800px" alt="Washington D.C."/>
            </div>
          </Carousel>
          </Card>
          </Col>
          </Row>
          </Content>
    );
  }
}
 
export default HomePage;