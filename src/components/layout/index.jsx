import React from 'react'
import '../../sass/index.scss';
import Router from '../../router/Router';
import Header from './header/Header';
import Footer from './footer/Footer';

const Layout = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="main">
          <Router />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Layout