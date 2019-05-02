import React from 'react';
import './Page.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Divider } from '@material-ui/core';

const Page = (props) => {
    return (
        <div className="page">
            <Header />
            <Divider />
            <div className="page-content">
                {props.children}
            </div>
            <Divider />
            <Footer />
        </div>
    );
};


export default Page;