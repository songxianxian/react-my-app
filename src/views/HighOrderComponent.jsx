/**
 * 高阶组件是一个函数，能够接受一个组件并返回一个新的组件
 * 
 * 虽然高阶组件的惯例是将所有 属性(props) 传递给包裹的组件，但是对 refs 不起作用。 
 * 那是因为 ref 不是一个真正的属性(props) - 不像 key
 * 解决这个问题的方法是使用 React.forwardRef
 * 
 * 高阶组件静态方法
 * 
 * 高阶组件参数
 * 
 * 高阶组件compose
 */

import React from "react";
export default class Demo extends React.Component {
    render() {
        return (
            <div>
                <EnhancedComponent name="zhangsan" id="1"/>
            </div>
        );
    }
}

const EnhancedComponent = logProps(Hello)

function Hello(props) {
    
    return (
        <div>
            <div>我是{props.name}</div>
            <ul>
               { props.list.map((item) => (<li key={item}>{item}</li>))}
            </ul>
        </div>
    );
}

function logProps(WrappedComponent) {
    return class extends React.Component {
        /**
         * 1. 过滤掉与高阶函数功能相关的props属性,不再传递
         * const { extraProp, ...passThroughProps } = this.props;
         * 2. 向包裹组件注入props属性，一般都是高阶组件的state状态或实例方法
         * const injectedProp = someStateOrInstanceMethod;
         * 3.向包裹组件传递props属性
         * return (<WrappedComponent injectedProp={injectedProp} {...passThroughProps} />)
         */
        constructor (props) {
            super(props);
            
            this.state = {
                list: [],
            }
        }
        componentDidMount () {
            this.requestList()
        }
        requestList () {
            // this.props.id
            this.setState({
                list: [1, 2, 3]
            })
            
        }
        render() {
            const {id, ...passThroughProps} = this.props;

            // this.requestList(id);
            // 用容器组件组合包裹组件且不修改包裹组件，这才是正确的打开方式。
            return <WrappedComponent list={this.state.list} {...passThroughProps} />;
        }
    };
}
