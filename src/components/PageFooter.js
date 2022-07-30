import React, {Component} from 'react';
import { Layout, Col, Row } from "antd";
import { Link } from 'react-router-dom';
import instagram_logo from '../images/social/Instagram_logo_2016.svg';
import facebook_logo from '../images/social/Facebook_F_icon.svg';
import twitter_logo from '../images/social/Twitter-logo.svg';
import youtube_logo from '../images/social/YouTube_full-color_icon_(2017).svg';

const { Footer } = Layout;

// class PageFooter extends Component {
//     render() {
const PageFooter = () => {
        return (
            <Footer className="footer">
                <hr></hr>
                <section id="wrapper">
                <Col span={4} offset={4}>
                    <h3>Help</h3>
                    <nav>         
                    <h4><Link to="/about">About</Link></h4>
                    <h4><Link to="/ContactUs">Contact us</Link> </h4>
                    <h4><Link to="/TermOfUse">Term of use</Link> </h4>
                    <h4><Link to="/PrivacyPolicy">Privacy policy</Link> </h4>
                    </nav>
                </Col>
                <Col span={4}>
                    <h3>Resources</h3>
                    <h4><a href="https://www.visittheusa.com/">Visit the USA</a></h4>
                    <h4><a href="https://www.tripadvisor.com/">Trip Advisor</a></h4>
                    <h4><a href="https://www.expedia.com">Expedia</a></h4>
                    <h4><a href="https://www.kayak.com">Kayak</a></h4>
                </Col>
                <Col span={4}>
                    <h3>Sponsors</h3>
                    <h4><a href="https://www.laioffer.com/">Laioffer</a></h4>
                    <h4><a href="https://www.purdue.edu/">Purdue University</a></h4>
                    <h4><a href="https://www.northeastern.edu/">Northeastern University</a></h4>
                </Col>
                <Col span={8}>
                <Row>
                <Col span={12} offset={6}>
                <a title="Facebook" data-track="click" data-type="social" target="_blank" href="https://facebook.com/tripadvisor" className="Anchor_complexLink_tas">
                {<img src={facebook_logo} style={{throwIfNamespace: false}} width="50" height="50"/>}
                </a>
                <a title="Twitter" data-track="click" data-type="social" target="_blank" href="https://twitter.com/tripadvisor" className="Anchor_complexLink_tas">
                {<img src={twitter_logo} width="50" height="50"/>}
                </a>
                <a title="Instagram" data-track="click" data-type="social" target="_blank" href="https://instagram.com/tripadvisor" className="Anchor_complexLink_tas">
                {<img src={instagram_logo} width="50" height="50" />}
                </a>
                <a title="Facebook" data-track="click" data-type="social" target="_blank" href="https://youtube.com/tripadvisor" className="Anchor_complexLink_tas">
                {<img src={youtube_logo} width="50" height="50"/>}
                </a>        
                </Col>
                </Row>
                <p></p>  
                <font size="3">
                ©2022 TripAdvisor. All Rights Reserved. Website Made by Laioffer Project Spring Class 1 Flag Camp Group 6.
                </font>         
                <p></p>     
                </Col>
                </section>
            </Footer>
        );
    }
// }

export default PageFooter;