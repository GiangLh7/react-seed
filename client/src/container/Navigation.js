import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
const classname = require('classname');
import './nav.scss';

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
};

const Navigation = ({user, logOut}) => {
  return (
    <nav className={classname('navigation')} role="navigation">
      <Link to="/" className={classname('item', 'logo')}>Super Host</Link>
      { user && user.authenticated ?
        (
          <Link onClick={logOut} className={classname('item')} to="/">Logout</Link>
        ) :
        (
          <Link className={classname('item')} to="/login">Log in</Link>
        )
      }
      <Link className={classname('item')} to="/dashboard">Dashboard</Link>
      <Link className={classname('item')} to="/about">About us</Link>
    </nav>
  );
}

export default connect(mapStateToProps, {})(Navigation);
