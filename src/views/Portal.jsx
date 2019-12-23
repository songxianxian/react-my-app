import React from 'react';
import './Portal.css';
import ReactDOM from 'react-dom';

/**
 * Portals 提供了一种很好的方法，将子节点渲染到父组件 DOM 层次结构之外的 DOM 节点。
 * 
 * 注： dom节点需事先写在模板上， 这个例子没写好， 跳过
 */
export default class Portal extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <>
                <div id="app-root">
                    <Parent/>
                </div>
                <div id="modal-root"></div>
            </>
        )
    }
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {clicks: 0};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // This will fire when the button in Child is clicked,
    // updating Parent's state, even though button
    // is not direct descendant in the DOM. 
    this.setState(prevState => ({
      clicks: prevState.clicks + 1
    }));
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <p>Number of clicks: {this.state.clicks}</p>
        <p>
          Open up the browser DevTools
          to observe that the button
          is not a child of the div
          with the onClick handler.
        </p>
        <Modal>
          <Child />
        </Modal>
      </div>
    );
  }
}

const modalRoot = document.getElementById('modal-root');
class Modal extends React.Component {
    constructor(props) {
      super(props);
      
      this.el = document.createElement('div');
    }
  
    componentDidMount() {
      modalRoot.appendChild(this.el);
    }
  
    componentWillUnmount() {
      modalRoot.removeChild(this.el);
    }
    
    render() {
      return ReactDOM.createPortal(
        this.props.children,
        this.el,
      );
    }
  }

function Child() {
  // The click event on this button will bubble up to parent,
  // because there is no 'onClick' attribute defined
  return (
    <div className="modal">
      <button>Click</button>
    </div>
  );
}