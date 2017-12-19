import React, {Component} from 'react';
import PropTypes from 'prop-types';

class AriaMenuButton extends Component {
  constructor(props) {
    super(props);
  }
  static contextTypes = {
    ambManager: PropTypes.object.isRequired
  };
  
  componentWillMount() {
    this.context.ambManager.button = this;
  }
  
  componentWillUnmount() {
    this.context.ambManager.destroy();
  }
  
  handleKeyDown(event) {
  
  }
  
  handleClick(event) {
  
  }
  
  render() {
    const props = this.props;
  
    const buttonProps = {
      // "The menu button itself has a role of button."
      role: 'button',
      tabIndex: props.disabled ? '' : '0',
      // "The menu button has an aria-haspopup property, set to true."
      'aria-haspopup': true,
      'aria-expanded': this.context.ambManager.isOpen,
      'aria-disabled': props.disabled,
      onKeyDown: this.handleKeyDown,
      onClick: this.handleClick,
      onBlur: this.context.ambManager.handleBlur
    };
  
    specialAssign(buttonProps, props, checkedProps);
  
    return React.createElement(props.tag, buttonProps, props.children);
  }
}
