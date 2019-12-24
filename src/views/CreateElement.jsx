import React from 'react';

export default class Demo extends React.Component {
    constructor (props) {
        super(props);
    }
    render () {
        return React.createElement(Hello, {toWhat: 'World'}, null)
    }
}


class Hello extends React.Component {
    render() {
      return React.createElement('div', null, `Hello ${this.props.toWhat}`);
    }
  }