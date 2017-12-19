import React, {Component} from 'react';
import PropTypes from 'prop-types';
import specialAssign from '../../utils/specialAssign';

const checkedProps = {
  children: PropTypes.node.isRequired,
  tag: PropTypes.string,
  text: PropTypes.string,
  value: PropTypes.any
}

class MenuItem extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const menuItemProps = {
      onClick: this.selectItem,
      onKeyDown: this.handleKeyDown,
      role: 'menuitem',
      tabIndex: '-1',
      ref: this.registerNode
    };
    
    specialAssign(menuItemProps, this.props, checkedProps);
    
    return React.createElement(
      this.props.tag,
      menuItemProps,
      this.props.children
    );
  }
  
  selectItem = event => {
    const value = typeof this.props.value !== 'undefined' ? this.props.value : this.props.children;
    alert(value);
    //this.context.ambManager.handleSelection(value, event);
  }
  
  handleKeyDown = event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    if (this.props.tag === 'a' && this.props.href) return;
    event.preventDefault();
    this.selectItem(event);
  }
  
  registerNode = node => {
    this.node = node;
  }
}

MenuItem.propTypes = checkedProps;
MenuItem.defaultProps = {
  tag: 'div',
  value: 'undefined',
  text: ''
}

export default MenuItem;
