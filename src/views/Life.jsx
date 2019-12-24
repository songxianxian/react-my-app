import React from "react";

export default class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: 'red'
        };
        this.handelChangeColor = this.handelChangeColor.bind(this);
    } 
    handelChangeColor () {
        this.setState({
            color: 'green'
        })
    }
    render() {
        return (
            <div className="lift">
                <button onClick={this.handelChangeColor}>改为绿色</button>
                <Child color={this.state.color}/>
            </div>
        );
    }
    
}


class Child extends React.Component {
    constructor(props) {
        console.log('constructor');
        super(props);
        this.state = {
            isToggleOn: false,
            transColor: 'red',
        };
        this.handleClick = this.handleClick.bind(this);
    }
    static getDerivedStateFromProps (nextProps, preState) { //这个方法是静态的，不能访问到组件的实例，无法在方法中使用this。
        console.log('getDerivedStateFromProps nextProps==', nextProps, 'preState==', preState);
        //getDerivedStateFromProps的返回值将作为setState的参数，如果返回null，则不更新state，不能返回object 或 null 以外的值，否则会警告
        if (nextProps.color !== preState.transColor) {
            return {  
                transColor: nextProps.color
            }
        }
        return null;
    }
    // UNSAFE_componentWillReceiveProps (props, state) {
    //     console.log('UNSAFE_componentWillReceiveProps props==', props, 'state==', state);
    // }
    shouldComponentUpdate (nextProps, nextState, nextContext) {
        console.log('shouldComponentUpdate nextProps==', nextProps, 'nextState==', nextState, 'nextContext==', nextContext);
        return true;
    }
    handleClick () {
        console.log('click---');
        
        this.setState((state) => ({isToggleOn: !state.isToggleOn}))
    }
    // UNSAFE_componentWillMount (any1, any2) {
    //     console.log('UNSAFE_componentWillMount');
        
    // }
    // UNSAFE_componentWillUpdate (nextProps, nextState, nextContext) { //readonly
    //     console.log('UNSAFE_componentWillUpdate');
    // }
    render () {
        console.log('render---');
        
        return (
            <div className="child">
                <button style={{color: this.props.color}} onClick={this.handleClick}>{this.state.isToggleOn ? "ON" : "OFF"}</button>
                <p>transColor: {this.state.transColor}</p>
            </div>
        )
    }
    getSnapshotBeforeUpdate(preProps, preState) { //readonly
        //getSnapshotBeforeUpdate 的使用场景一般是获取组建更新之前的滚动条位置
        console.log('getSnapshotBeforeUpdate  preProps==', preProps, 'preState==', preState);
        return null;
    }
    componentDidMount (any1, any2, any3) {
        console.log('componentDidMount');
    }
    componentDidUpdate (preProps, preState, snapshot) { //readonly
        console.log('componentDidUpdate');
        // snapshot 是从 getSnapshotBeforeUpdate 的返回值，默认是 null
    }
    componentWillUnmount () {
        console.log('componentWillUnmount');
        
    }
}


/**
 * 1. UNSAFE_componentWillUpdate、 UNSAFE_componentWillReceiveProps 在存在static getDerivedStateFromProps 和 getSnapshotBeforeUpdate 这两个方法的时候不会执行
 * 
 * 2. static getDerivedStateFromProps 它是作为componentWillReceiveProps的代替品出现，无论是mounting还是updating都会被触发； componentWillReceiveProps只会updating阶段，并且是父组件触发的render才被调用
 * 
 * 3. 最常见的误解就是 getDerivedStateFromProps 和 componentWillReceiveProps 只会在 props “改变”时才会调用。实际上只要父级重新渲染时，这两个生命周期函数就会重新调用，不管 props 有没有“变化”。
 */

