import React, {Component} from 'react';
import {linear} from 'linear-debounce';
import {generateToastId} from './helpers'

class ToastManager extends Component {
  constructor(props) {
    super(props);
    this.debouncer = {};
  }
  
  componentDidMount() {
    window.addEventListener('NewToast', this.onNewToast);
  }
  
  componentWillUnmount() {
    Object.values(this.debouncer).forEach((item) => item.cancel());
    delete this.debouncer;
    window.removeEventListener('NewToast', this.onNewToast);
  }
  
  onNewToast(e) {
    const payload = e.detail;
    if (!payload) {
      return;
    }
    const timeout = parseInt(payload.timeout, 10) || parseInt(this.config.toastTimeout, 10),
      sticky = payload.sticky,
      toastId = generateToastId(),
      height = 0;
    
    this.debouncer[toastId] = linear({
      '0': () => {
        this.setState((prevState) => ({toasts: [{toastId, payload, height}].concat(prevState.toasts)}));
      },
      '50': () => {
        this.showToast(toastId);
      },
      [timeout.toString()]: () => !sticky && this.dismiss(toastId)
    });
    
    // start toast notification
    this.debouncer[toastId]();
  }
  
  showToast(toastId) {
    this.setState((prevState) => {
      const nextState = Object.assign({}, prevState);
      const toastIndex = nextState.toasts.findIndex((toast) => toast.toastId === toastId);
      if (toastIndex === -1) {
        return prevState;
      }
      nextState.toasts[toastIndex].shown = true;
      nextState.toasts[toastIndex].height = this.toasts[toastId].height;
      return nextState;
    });
  }
  
  dismiss(toastId, force) {
    const key = Date.now();
    const hide = force ? 0 : 50,
          remove = hide + 300;
    this.debouncer[key] = linear({
      [hide.toString()]: () => {
        this.hideToast(toastId, force)
      },
      [remove.toString()]: () => {
        this.removeToast(toastId, force)
      }
    });
    this.debouncer[key]();
  }
  
  hideToast(toastId, force) {
  
  }
  
  removeToast(toastId, force) {
  
  }
}

export default ToastManager;
