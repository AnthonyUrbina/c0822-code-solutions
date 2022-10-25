import React from 'react';

let i = 0;
let color = 'stock';

class HotButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clickCounter: i };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    i++;
    this.setState({ clickCounter: i });
  }

  render() {
    const clickCounter = this.state.clickCounter;
    if (clickCounter >= 3 && clickCounter < 6) {
      color = 'dark-purple';
    } else if (clickCounter >= 6 && clickCounter < 9) {
      color = 'light-purple';
    } else if (clickCounter >= 9 && clickCounter < 12) {
      color = 'red';
    } else if (clickCounter >= 12 && clickCounter < 15) {
      color = 'orange';
    } else if (clickCounter >= 15 && clickCounter < 18) {
      color = 'yellow';
    } else if (clickCounter >= 18) {
      color = 'white';
    }

    return <button className={color} onClick={this.handleClick}>Hot Button</button>;
  }
}

export default HotButton;
