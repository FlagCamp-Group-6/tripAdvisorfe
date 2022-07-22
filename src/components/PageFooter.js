import React, {Component} from 'react';
import { Layout } from "antd";

const { Footer } = Layout;

class PageFooter extends Component {
    render() {
        return (
            <Footer className="footer">
                <font size="5">
                ©2022 TripAdvisor. All Rights Reserved. Website Made by Laioffer Project Spring Class 1 Flag Camp Group 6.
                </font>
            </Footer>
        );
    }
}

export default PageFooter;