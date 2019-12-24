import React from "react";

/**
 *  “render prop” 是指一种技术，用于使用一个值为函数的 prop 在 React 组件之间的代码共享
 * 
 * 类似于vue中的作用域插槽
 */

export default class MouseTracker extends React.Component {
    constructor(props) {
        super(props);

        // This binding ensures that `this.renderTheCat` always refers
        // to the *same* function when we use it in render.
        this.renderTheCat = this.renderTheCat.bind(this);
    }

    renderTheCat(mouse) {
        return <Cat mouse={mouse} />;
    }

    render() {
        return (
            <div>
                <h1>Move the mouse around!</h1>
                <Mouse render={this.renderTheCat} />
            </div>
        );
    }
}

class Mouse extends React.Component {
    constructor(props) {
        super(props);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.state = { x: 0, y: 0 };
    }

    handleMouseMove(event) {
        this.setState({
            x: event.clientX,
            y: event.clientY
        });
    }

    render() {
        return (
            <div style={{ height: "500px", backgroundColor: "red" }} onMouseMove={this.handleMouseMove}>
                {/*
            Instead of providing a static representation of what <Mouse> renders,
            use the `render` prop to dynamically determine what to render.
          */}
                {this.props.render(this.state)}
            </div>
        );
    }
}

class Cat extends React.Component {
    render() {
        const mouse = this.props.mouse;
        return (
            <img
                src="./1.png"
                style={{ position: "absolute", left: mouse.x, top: mouse.y }}
            />
        );
    }
}
