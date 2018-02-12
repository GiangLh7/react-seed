const ReactDOM = require('react-dom')
const createFocusGroup = require('focus-group');

const focusGroupOptions = {
  wrap: true,
  stringSearch: true
};

const protoManager = {
  init(options) {
    this.options = options || {};
    
    this.handleBlur = handleBlur.bind(this);
    this.handleSelection = handleSelection.bind(this);
    this.handleMenuKey = handleMenuKey.bind(this);
    
    this.focusGroup = createFocusGroup(focusGroupOptions);
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
    if (!openOptions.focusMenu) {
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
  
  handleButtonNonArrowKey(event){
    this.focusGroup._handleUnboundKey(event);
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
  },
  
  toggleMenu(closeOptions, openOptions) {
    closeOptions = closeOptions || {}
    openOptions = openOptions || {}
    if (this.isOpen) {
      this.closeMenu(closeOptions);
    } else {
      this.openMenu(openOptions);
    }
  },
}

function handleMenuKey(event) {
  if (this.isOpen && event.key === 'Escape') {
    event.preventDefault();
    this.closeMenu({ focusButton: true });
  }
}

function handleBlur() {
  const self = this;
  self.blurTimer = setTimeout(function() {
    const buttonNode = ReactDOM.findDOMNode(self.button);
    if (!buttonNode) return;
    const activeEl = buttonNode.ownerDocument.activeElement;
    if (buttonNode && activeEl === buttonNode) return;
    const menuNode = ReactDOM.findDOMNode(self.menu);
    if (menuNode === activeEl) {
      self.focusItem(0);
      return;
    }
    if (menuNode && menuNode.contains(activeEl)) return;
    if (self.isOpen) self.closeMenu({ focusButton: false });
  }, 0);
}

function handleSelection(value, event) {
  if (this.options.onSelection) this.options.onSelection(value, event);
}

export default function (options) {
  const newManager = Object.create(protoManager);
  newManager.init(options);
  return newManager;
}
