const ReactDOM = require('react-dom')
const createFocusGroup = require('focus-group');

const protoManager = {
  init(options) {
    this.options = options || {};
    
    this.handleBlur = handleBlur.bind(this);
    this.handleSelection = handleSelection.bind(this);
    
    this.focusGroup = createFocusGroup(this.options);
    this.button = null;
    this.menu = null;
    this.isOpen = null;
  },
  
  addItem(item) {
    this.focusGroup.addMember(item);
  },
  
  clearItems() {
    this.focusGroup.clearMembers();
  },
  
  focusItem(index) {
    this.focusGroup.focusNodeAtIndex(index);
  },
  
  update() {
    this.menu.setState({ isOpen: this.isOpen });
    this.button.setState({ menuOpen: this.isOpen });
    this.options.onMenuToggle && this.options.onMenuToggle({ isOpen: this.isOpen });
  },
  
  destroy() {
    this.button = null;
    this.menu = null;
    this.focusGroup.deactivate();
    clearTimeout(this.moveFocusTimer);
  },
  
  openMenu(openOptions) {
    if (this.isOpen) {
      return;
    }
    openOptions = openOptions || {};
    if (openOptions.focusMenu === undefined) {
      openOptions.focusMenu = true;
    }
    this.isOpen = true;
    this.update();
    this.focusGroup.activate();
    
    if (openOptions.focusMenu) {
      const self = this;
      this.moveFocusTimer = setTimeout(function () {
        self.focusItem(0)
      }, 0);
    }
  },
  
  closeMenu(closeOptions) {
    if (!this.isOpen) {
      return;
    }
    closeOptions = closeOptions || {};
    this.isOpen = false;
    this.update();
    if (closeOptions.focusButton) {
      ReactDOM.findDOMNode(this.button).focus();
    }
  }
}

function handleBlur() {

}

function handleSelection(value, event) {

}
