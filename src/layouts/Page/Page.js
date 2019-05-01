import React from 'react';
import './Page.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Page = (props) => {
    return (
        <div className="page">
            <Header />
            {props.children}
            <Footer />
        </div>
    );
};

export default Page;