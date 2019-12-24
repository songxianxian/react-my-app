import React from 'react';

export default class MyRef extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.ref = React.createRef();
        this.anotherRef = React.createRef();
        this.functionRef = React.createRef();
    }
    handleClick () {
        // console.log('refs==', this.ref);
        // this.ref.current.focus();

        console.log('refs==', this.anotherRef);
        // this.ref.current.focus();
        
    }
    render () {
        return (
            <div className="my-refs" style={{padding: '20px'}}>
                {/* <FancyButton ref={ref} onClick={this.handleClick}>Click me!</FancyButton>; */}
               <MyText ref={this.ref} style={{marginTop: '20px', display: 'block'}}/>   
               <AnotherText ref={this.anotherRef} style={{marginTop: '20px', display: 'block'}}/> 
               <button onClick={this.handleClick} style={{marginTop: '20px', display: 'block'}}>点击获取ref</button>
               {/* <MyFunctionalComponent ref={this.functionRef}/>   会报错*/}
               <CustomTextInput/>
            </div>
        )
    }

}


const MyText = React.forwardRef((props, ref) => (<input ref={ref}></input>))


const AnotherText = React.forwardRef((props, ref) => {
    class WrapperAnotherText extends React.Component {
        constructor (props) {
            super(props)
        }
        render () {
            return (
                <input type="checkbox" ref={this.props.transRef}/>
            )
        }
    }
    return <WrapperAnotherText {...props} transRef={ref}/>
})

function MyFunctionalComponent() {  //函数式组件内部是可以使用ref的
    return <input />;
}

class CustomTextInput extends React.Component { //两种方法： 1、React.createRef  2、ref回调
    constructor (props) {
        super(props);
        this.textInput = null;
    }
    setTextInputRef = element => {
        this.textInput = element;
    }
    handleClick = () => {
        if (this.textInput) this.textInput.focus();
    }
    render () {
        return (
            <div>
                <input type="text" ref={this.setTextInputRef}/>
                <button onClick={this.handleClick}>获取焦点</button>
            </div>
        )
    }
}

/**
 * ref的值取决于节点的类型:
 * 1. 当 ref 属性被用于一个普通的 HTML 元素时，React.createRef() 将接收底层 DOM 元素作为它的 current 属性以创建 ref
 * 2. 当 ref 属性被用于一个自定义类组件时，ref 对象将接收该组件已挂载的实例作为它的 current
 * 3. 你不能在函数式组件上使用 ref 属性，因为它们没有实例
 */
