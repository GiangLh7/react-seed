import React, { Component } from 'react';
//import './slider.scss';
const classname = require('classname');

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = { dir: '', isAnimating: false, currentItemIndex: 0 };
  }
  
  navigate(direction) {
    const { currentItemIndex, isAnimating } = this.state;
    const { items, onNavigate } = this.props;
    
    if (isAnimating) {
      return;
    }
    if (typeof(onNavigate) === 'function') {
      onNavigate();
    }
  
    this.setState({ dir: direction, isAnimating: true });
    
    let nextItemIndex;
    if (direction === 'right') {
      nextItemIndex = currentItemIndex < items.length - 1 ? currentItemIndex + 1 : 0;
    }
    else {
      nextItemIndex = currentItemIndex > 0 ? currentItemIndex - 1 : items.length - 1;
    }
    
    const self = this;
    setTimeout(function () {
      self.setState({ isAnimating: false, currentItemIndex: nextItemIndex });
    }, 1000);
  }
  
  getCurrentImg() {
    const { items } = this.props;
    const { currentItemIndex } = this.state;
    return items[currentItemIndex];
  }
  
  render() {
    const { items } = this.props;
    const { isAnimating, dir } = this.state;
    
    if (!items || !items.length) {
      return null;
    }
    
    return (
      <div className={classname('slider', {'slider--show-next': isAnimating && dir === 'right', 'slider--show-prev': isAnimating && dir === 'left'})}>
        <div className="slider_item slider_item--current">
          <img className="slider_img" src={this.getCurrentImg()}/>
        </div>
        <nav className="slider_nav-wrap">
          <button className="slider_nav slider_nav--prev" onClick={ evt => { this.navigate('left') }}>
            <i className="icon ion-ios-arrow-left" /><span className="text-hidden">Previous</span>
          </button>
          <button className="slider_nav slider_nav--next" onClick={ evt => {this.navigate('right') }}>
            <i className="icon ion-ios-arrow-right"/><span className="text-hidden">Next</span>
          </button>
        </nav>
      </div>
    );
  }
}

Slider.defaultProps = {
  items: ['/public/images/1.jpg', '/public/images/2.jpg', '/public/images/3.jpg', '/public/images/4.jpg'],
  onNavigate: function () {
    return false;
  }
};

export default Slider;
