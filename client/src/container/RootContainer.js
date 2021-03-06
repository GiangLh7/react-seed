import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Slider from '../component/imageslider/Slider'
import Navigation from './Navigation';
import MenuItem from '../component/menubutton/MenuItem';
import Wrapper from '../component/menubutton/Wrapper';
import Menu from '../component/menubutton/Menu';
import Button from '../component/menubutton/Button';
import {Dashboard, LoginOrRegister, About} from '../pages';
import '../stylesheets/main.scss';

const words = [
  'pectinate',
  'borborygmus',
  'anisodactylous',
  'barbar',
  'pilcrow',
  'destroy'
];
export default class RootContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: '', noMenu: false };
  }
  
  handleSelection(value) {
    this.setState({selected: value});
  }
  
  render() {
    const {selected} = this.state;
    const menuItemElements = words.map((word, i) => {
      let itemClass = 'AriaMenuButton-menuItem';
      if (selected === word) {
        itemClass += ' is-selected';
      }
      const display = word === 'destroy' ? 'destroy this menu' : word;
      return (
        <li className="AriaMenuButton-menuItemWrapper" key={i}>
          <MenuItem className={itemClass} value={word} text={word}>
            {display}
          </MenuItem>
        </li>
      );
    });
    return (
      <div>
        <Navigation/>
        <div className="site-content">
          
          <Slider />
          
          <Wrapper className="AriaMenuButton" onSelection={this.handleSelection.bind(this)}>
            <Button className="AriaMenuButton-trigger">Select a word</Button>
            <Menu>
              <ul className="AriaMenuButton-menu">{menuItemElements}</ul>
            </Menu>
          </Wrapper>
          <span style={{ marginLeft: '1em' }}>
          Your last selection was: <strong>{selected}</strong>
        </span>
        </div>
  
        <Switch>
          <Route path='/login' component={LoginOrRegister} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/about' component={About}/>
        </Switch>
      </div>
    );
  }
}
