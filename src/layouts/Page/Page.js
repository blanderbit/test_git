import React from 'react';

import './Page.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Page = (props) => {
  return (
    <div className="page">
      <Header />
      <div className="page-content">
        {props.children}
      </div>
      <Footer />
    </div>
  );
}



export default Page;