import React from 'react';

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
    componentDidCatch (error, info) { //与 static getDerivedStateFromError 二选其一
        this.setState({
            hasError: true
        })
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

