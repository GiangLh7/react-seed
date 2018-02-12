import React, {Component} from 'react';
import PropTypes from 'prop-types';
import specialAssign from '../../utils/specialAssign';

const checkedProps = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  tag: PropTypes.string
};

class Menu extends Component {
  constructor(props) {
    super(props);
  }
  
  static contextTypes = {
    ambManager: PropTypes.object.isRequired
  }
  
  componentWillMount() {
    this.context.ambManager.menu = this;
  }
  
  componentDidUpdate() {
    const ambManager = this.context.ambManager;
    
    if (!ambManager.isOpen) {
       ambManager.clearItems();
    }
  }
  
  componentWillUnmount() {
    this.context.ambManager.destroy();
  }
  
  render() {
    const props = this.props;
    const ambManager = this.context.ambManager;
    const menuProps = {
      onKeyDown: ambManager.handleMenuKey,
      role: 'menu',
      obBlur: null,
      tabIndex: -1
    };
    
    const childrenToRender = (function () {
      if (typeof props.children === 'function') {
        return props.children({ isOpen: ambManager.isOpen })
      }
      if (ambManager.isOpen) return props.children;
      return false;
    })();
    
    if (!childrenToRender) {
      return false;
    }
    
    specialAssign(menuProps, props, this.propTypes);
    
    return React.createElement(this.props.tag, menuProps, childrenToRender);
  }
}

Menu.propTypes = checkedProps;

Menu.defaultProps = {
  tag: 'div'
}

export default Menu;
