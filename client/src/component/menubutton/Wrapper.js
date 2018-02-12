import React, {Component} from 'react';
import PropTypes from 'prop-types';
import createMananger from './createManager';

class AriaMenuButtonWrapper extends Component {
  constructor(props) {
    super(props);
  }
  
  static childContextTypes = {
    ambManager: PropTypes.object
  };
  
  getChildContext() {
    return {
      ambManager: this.manager
    }
  }
  
  componentWillMount() {
    this.manager = createMananger({
      onSelection: this.props.onSelection,
      closeOnSelection: this.props.closeOnSelection,
      id: this.props.id
    });
  }
  
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

AriaMenuButtonWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  onSelection: PropTypes.func,
  onMenuToggle: PropTypes.func,
  closeOnSelection: PropTypes.bool
}

export default AriaMenuButtonWrapper;
