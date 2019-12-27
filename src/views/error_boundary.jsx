import React from 'react';
/**
 * 错误边界 无法 捕获如下错误:
 * 1. 事件处理， 如果你需要在事件处理器内部捕获错误，使用普通的 JavaScript try / catch 语句
 * 2. 异步代码 （例如 setTimeout 或 requestAnimationFrame 回调函数）
 * 3. 服务端渲染
 * 4. 错误边界自身抛出来的错误 （而不是其子组件）
 * 
 *  仅有类组件可以成为错误边界
 * 
 *  注意：
 *  错误边界(Error Boundaries) 仅可以捕获其子组件的错误。错误边界无法捕获其自身的错误。
 *  如果一个错误边界无法渲染错误信息，则错误会向上冒泡至最接近的错误边界。
 *  这也类似于 JavaScript 中 catch {} 的工作机制
 * 
 */
export default function (props) {
    return (
        <ErrorBoundary>
            <Widget></Widget>
        </ErrorBoundary>
    )
}


class ErrorBoundary extends React.Component {    //仅类组件可以成为错误边界， 因为类组件有componentDidCatch 和state
    constructor (props) {
        super(props);
        this.state = {
            hasError: false,
        }
    }
    static getDerivedStateFromError (error) {
        console.log('执行了');
        
        return {
            hasError: true,
        }
    }
    componentDidCatch (error, info) { //与 static getDerivedStateFromError 二选其一， 也可以两个同时存在
        console.log('error==', error);
         
        // this.setState({
        //     hasError: true
        // })
    }
    render () {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }
        return this.props.children
    }
}

class Widget extends React.Component {
    constructor (props) {
        super(props)
    }
    render () {
        throw new Error(123)
        return <div>3333</div>
    }
}

