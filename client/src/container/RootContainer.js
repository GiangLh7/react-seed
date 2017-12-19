import React, { Component } from 'react';
import Slider from '../component/imageslider/Slider'
import VerticalNav from '../component/nav/VerticalNav';

export default class RootContainer extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <p>Hello</p>
        <Slider />
        <VerticalNav/>
      </div>
    );
  }
}
