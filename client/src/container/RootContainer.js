import React, { Component } from 'react';
import Slider from '../component/imageslider/Slider'

export default class RootContainer extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <p>Hello</p>
        <Slider />
      </div>
    );
  }
}
