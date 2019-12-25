import React from "react";
/**
 * render() 方法是类组件中唯一必须的方法.
 * render() 函数应该是纯函数，这意味着它不会修改组件状态，每次调用它时返回相同的结果，它不会直接与浏览器交互
 * 如果需要与浏览器交互，请改用 componentDidMount() 或其他生命周期方法执行你的工作。
 * 保持render() 为纯函数使得组件更容易理解
 *
 * constructor()如果你没有初始化 状态(state) ，并且没有绑定方法，你不需要为你的 React 组件实现一个构造函数
 * React 构造函数只用于两个目的:
 * 1. 通过分配一个对象到 this.state 来初始化本地 state
 * 2. 将 事件处理程序 方法绑定到实例
 * 不应该在 constructor() 中调用 setState()
 * 相反，如果您的组件需要使用本地 state，直接在构造函数中 将初始状态赋给 this.state 即可
 * 避免在构造函数中引入任何 副作用(side-effects) 或 订阅(subscriptions) 。对于那些用例，使用 componentDidMount() 来代替
 */

export default class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: "red"
        };
        this.handelChangeColor = this.handelChangeColor.bind(this);
    }
    handelChangeColor() {
        this.setState({
            color: "green"
        });
    }
    render() {
        return (
            <div className="lift">
                <button onClick={this.handelChangeColor}>改为绿色</button>
                <Child color={this.state.color} />
            </div>
        );
    }
}

class Child extends React.Component {
    constructor(props) {
        console.log("constructor");
        super(props);
        this.state = {
            isToggleOn: false,
            transColor: "red"
        };
        this.handleClick = this.handleClick.bind(this);
    }
    static getDerivedStateFromProps(nextProps, preState) {
        //这个方法是静态的，不能访问到组件的实例，无法在方法中使用this。
        console.log(
            "getDerivedStateFromProps nextProps==",
            nextProps,
            "preState==",
            preState
        );
        //getDerivedStateFromProps的返回值将作为setState的参数，如果返回null，则不更新state，不能返回object 或 null 以外的值，否则会警告
        if (nextProps.color !== preState.transColor) {
            return {
                transColor: nextProps.color
            };
        }
        return null;
    }
    // UNSAFE_componentWillReceiveProps (props, state) {
    //     console.log('UNSAFE_componentWillReceiveProps props==', props, 'state==', state);
    // }
    shouldComponentUpdate(nextProps, nextState) {
        console.log(
            "shouldComponentUpdate nextProps==",
            nextProps,
            "nextState==",
            nextState,
        );
        return true;
    }
    handleClick() {
        console.log("click---");

        this.setState(state => ({ isToggleOn: !state.isToggleOn }));
    }
    // UNSAFE_componentWillMount (any1, any2) {
    //     console.log('UNSAFE_componentWillMount');

    // }
    // UNSAFE_componentWillUpdate (nextProps, nextState, nextContext) { //readonly
    //     console.log('UNSAFE_componentWillUpdate');
    // }
    render() {
        console.log("render---");

        return (
            <div className="child">
                <button
                    style={{ color: this.props.color }}
                    onClick={this.handleClick}
                >
                    {this.state.isToggleOn ? "ON" : "OFF"}
                </button>
                <p>transColor: {this.state.transColor}</p>
            </div>
        );
    }
    getSnapshotBeforeUpdate(preProps, preState) {
        //readonly
        //getSnapshotBeforeUpdate 的使用场景一般是获取组建更新之前的滚动条位置
        console.log(
            "getSnapshotBeforeUpdate  preProps==",
            preProps,
            "preState==",
            preState
        );
        return 123;
    }
    componentDidMount(any1, any2, any3) {
        console.log("componentDidMount");
    }
    componentDidUpdate(preProps, preState, snapshot) {
        //readonly
        console.log(
            "componentDidUpdate preProps==",
            preProps,
            "preState==",
            preState,
            "snapshot==",
            snapshot
        );
        // snapshot 是从 getSnapshotBeforeUpdate 的返回值，默认是 null
        
        // Typical usage (don't forget to compare props):
        // if (this.props.userID !== prevProps.userID) {
        //     this.fetchData(this.props.userID);
        // }
    }
    componentWillUnmount() {
        console.log("componentWillUnmount");
    }
}

/**
 * 1. UNSAFE_componentWillUpdate、 UNSAFE_componentWillReceiveProps 在存在static getDerivedStateFromProps 和 getSnapshotBeforeUpdate 这两个方法的时候不会执行
 *
 * 2. static getDerivedStateFromProps 它是作为componentWillReceiveProps的代替品出现，无论是mounting还是updating都会被触发； componentWillReceiveProps只会updating阶段，并且是父组件触发的render才被调用
 *
 * 3. 最常见的误解就是 getDerivedStateFromProps 和 componentWillReceiveProps 只会在 props “改变”时才会调用。实际上只要父级重新渲染时，这两个生命周期函数就会重新调用，不管 props 有没有“变化”。
 */
