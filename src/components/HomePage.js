import React from "react";
import { Radio, Image, Card, Carousel, Row, Col } from 'antd';
import usmap from '../images/Blank_US_Map.svg';
import fign1 from '../images/NY/NY.jpg' 
import figl1 from '../images/LA/LA.jpg' 
import figc1 from '../images/CHI/Chicago.jpg' 
import figm1 from '../images/MIA/Miami.jpg' 
import figh1 from '../images/HOU/Houston.jpg' 
import figs1 from '../images/SF/SF.jpg' 
import figw1 from '../images/WDC/DC.jpg' 

class HomePage extends React.Component {

  radioChangeHandler = e => {
    this.props.handleSelection(e.target.value);
  };

  render() {
    
    return (
        <>
        <img src={usmap} alt="Have a nice trip" className="usamap" title="Where is your favoriate destination" width="1534" height="949" />
        <Radio.Group name="cities" defaultValue={1} onChange={this.radioChangeHandler} className="radiogroup1">
            <Radio value={1} className='radio1'>New York</Radio>
            <Radio value={2} className='radio2'>Los Angeles</Radio>
            <Radio value={3} className='radio3'>Chicago</Radio>
            <Radio value={4} className='radio4'>Miami</Radio>
            <Radio value={5} className='radio5'>Houston</Radio>
            <Radio value={6} className='radio6'>San Francisco</Radio>
            <Radio value={7} className='radio7'>Washington D.C.</Radio>
        </Radio.Group>
        <Row>
          <Col className='carousel' xs={6} offset={18}>
          <Card title={<h1>These are international alpha cities in U.S. </h1>}>
          <Carousel autoplay vertical="true">
            <div>
            <Image src={fign1} height="500px" width="500px" alt="New York"/>
            </div>
            <div>
            <Image src={figl1} height="500px" width="500px" alt="Los Angeles"/>
            </div>
            <div>
            <Image src={figc1} height="500px" width="500px" alt="Chicago"/>
            </div>
            <div>
            <Image src={figm1} height="500px" width="500px" alt="Miami"/>
            </div>
            <div>
            <Image src={figh1} height="500px" width="500px" alt="Houston"/>
            </div>
            <div>
            <Image src={figs1} height="500px" width="500px" alt="San Francisco"/>
            </div>
            <div>
            <Image src={figw1} height="500px" width="500px" alt="Washington D.C."/>
            </div>
          </Carousel>
          </Card>
          </Col>
          </Row>
        </>
    );
  }
}
 
export default HomePage;